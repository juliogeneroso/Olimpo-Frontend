import { Injectable, Output, Input, EventEmitter } from '@angular/core';


declare var webkitSpeechRecognition: any;

@Injectable({
  providedIn: 'root'
})
export class VoiceRecognitionService {

  recognition =  new webkitSpeechRecognition();
  isStoppedSpeechRecog = false;
  public text = '';
  @Input()  nome = "";
  @Output() textChange = new EventEmitter();
  tempWords;

  constructor() { }

  init() {

    this.recognition.interimResults = true;
    this.recognition.lang = 'pt-BR';

    this.recognition.addEventListener('result', (e) => {
      const transcript = Array.from(e.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join('');
      this.tempWords = transcript;
      console.log(transcript);
    });
  }

  start() {
    this.text='';
    this.isStoppedSpeechRecog = false;
    this.recognition.start();
    console.log("Speech recognition started")
    this.recognition.addEventListener('end', (condition) => {
      if (this.isStoppedSpeechRecog) {
        console.log(this.isStoppedSpeechRecog);
        this.recognition.stop();
        console.log("End speech recognition");
      } else {
        this.wordConcat();
        this.stop();
        //this.recognition.stop();
      }
    });
  }
  stop() {
    this.isStoppedSpeechRecog = true;
    //this.wordConcat()
    this.onNameChange();
    this.recognition.stop();
    console.log("End speech recognition")
  }

  wordConcat() {
    if(this.text.length==0){
      this.text = this.tempWords;
    } else {
      this.text = this.text + ' ' + this.tempWords;
    }
    this.tempWords = '';
  }

  delete(){
    this.text = '';
  }
  pegarPalavra(){
    return this.text;
  }
  onNameChange(){
    this.textChange.emit(this.text);  
  }
}