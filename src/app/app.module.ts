import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {UnicornCardComponent} from './pages/unicorn-list/unicorn-card/unicorn-card.component';
import {UnicornListComponent} from './pages/unicorn-list/unicorn-list.component';
import {HttpClientModule} from '@angular/common/http';
import {HeaderComponent} from './shared/components/header/header.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {NavComponent} from './shared/components/nav/nav.component';
import {LayoutModule} from '@angular/cdk/layout';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { MagicalNamePipe } from './shared/pipes/magical-name.pipe';

@NgModule({
    declarations: [
        AppComponent,
        UnicornCardComponent,
        UnicornListComponent,
        HeaderComponent,
        NavComponent,
        MagicalNamePipe,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatIconModule,
        LayoutModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatListModule,
        MatCardModule,
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    ],
    providers: [
        // { provide: UnicornsService, useClass: UnicornsService },
        // UnicornsService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
