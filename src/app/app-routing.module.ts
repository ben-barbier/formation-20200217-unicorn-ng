import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UnicornListComponent} from './pages/unicorn-list/unicorn-list.component';
import {AdminComponent} from './pages/admin/admin.component';

const routes: Routes = [
    {
        path: 'list',
        component: UnicornListComponent,
        data: {
            coucou: 'test',
        }
    },
    {
        path: 'admin',
        loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule)
    },
    {
        path: '**',
        redirectTo: 'list',
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
