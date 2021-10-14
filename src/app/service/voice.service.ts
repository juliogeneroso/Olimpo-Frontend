import { ThisReceiver } from '@angular/compiler';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Injectable, Output, Input, EventEmitter } from '@angular/core';


declare var webkitSpeechRecognition: any;

@Injectable({
  providedIn: 'root'
})
export class VoiceRecognitionService {

  recognition =  new webkitSpeechRecognition();
  isStoppedSpeechRecog = false;
  public text = '';
  tempWords;
  estilo;
  microfone;

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
    this.microfone = true;
    this.estilo = {'color':'#006400'};
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
      }
    });
  }
  stop() {
    this.microfone=false;
    this.estilo = {'color':'black'};
    this.isStoppedSpeechRecog = true;
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
}