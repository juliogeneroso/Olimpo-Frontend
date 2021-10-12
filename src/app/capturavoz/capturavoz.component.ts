
import { Component, OnInit } from '@angular/core';
import { VoiceRecognitionService } from '../service/voice.service';

@Component({
  selector: 'app-speech-to-text',
  templateUrl: './capturavoz.component.html',
  styleUrls: ['./capturavoz.component.css'],
  providers: [VoiceRecognitionService]
})
export class SpeechToTextComponent implements OnInit {

  public microfone:boolean = false;

  constructor(
    public service : VoiceRecognitionService
  ) { 
    this.service.init()
   }

  ngOnInit(): void {
  }

  startService(){
    if(this.microfone){
      this.microfone=false;
    } else {
      this.microfone=true;
      this.service.start()
    }
  }
  stopService(){
    this.service.stop()
  }
  deleteService(){
    this.service.delete();
  }

}