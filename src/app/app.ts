import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

//Decorator
//Adicionando funcionalidades a objetos em tempo de execução.
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('calc-angular');
}
