import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppComponent } from './app.component';
import { jokesReducer } from './store/jokes.reducer';
import { JokesEffects } from './store/jokes.effects';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import {JokeService} from './services/joke.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    RouterModule, // Import RouterModule
    CommonModule,
    BrowserModule,
    StoreModule.forRoot({jokes: jokesReducer}), // Provide mock store
    EffectsModule.forRoot([JokesEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: true }),
  ],
  providers: [provideHttpClient(), JokeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
