import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import {Calculadora} from './calculadora/calculadora';

bootstrapApplication(Calculadora, appConfig)
  .catch((err) => console.error(err));
