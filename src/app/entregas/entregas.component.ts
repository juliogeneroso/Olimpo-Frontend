import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { FormBuilder,FormsModule,ReactiveFormsModule } from '@angular/forms';



interface Tipo {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-entregas',
  templateUrl: './entregas.component.html',
  styleUrls: ['./entregas.component.css'],
})
export class EntregasComponent {

  constructor(private formBuilder: FormBuilder){}

  checkoutForm = this.formBuilder.group({
    viewValue: '',
    number: '',
  });


  tipos: Tipo[] = [
    {value: '0', viewValue: 'Serviços'},
    {value: '1', viewValue: 'Cartas'},
    {value: '2', viewValue: 'Mercadorias'}
  ];

  selectedTipo = this.tipos[2].viewValue;

  restantes = [
    'IFood - AP 62º',
    'Encomenda - AP 33º',
    'Encomenda - AP 23º',
    'Encomenda - AP 40º'
  ];

  concluidas = [
    'Entrega de Cartas - AP 20º',
    'Entrega de Cartas - AP 19º',
    'Entrega de Cartas - AP 15º'  
  ];

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex);
    }
  }

  onSubmit(){
    console.log(this.checkoutForm.value['viewValue']+" - "+" AP "+this.checkoutForm.value['number']+"º");
    this.restantes.push(this.checkoutForm.value['viewValue']+" - "+" AP "+this.checkoutForm.value['number']+"º");
  }
}
