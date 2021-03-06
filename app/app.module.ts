import {NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import { RouterModule } from '@angular/router'
import { HttpModule } from '@angular/http' 

import {
	CreateEventComponent,
	CreateSessionComponent,
	EventslistComponent,
	EventThumbnailComponent,
	EventService,
	EventDetailsComponent,
	EventListResolver,
	EventRouteActivator,
    SessionListComponent,
	DurationPipe
} from './events/index'
import { EventsAppComponent } from './events-app.component'
import { NavBarComponent } from './nav/navbar.components'
import { TOASTE_TOKEN, Toastr } from './common/toastr.service'
import {CollapsibleWellComponent } from './common/collapsible-well.component' 
import { appRoutes } from './routes'
import { Error404Component } from './errors/404.component'
import { AuthService } from './user/auth.service'
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

declare let toastr : Toastr
@NgModule({
	imports: [BrowserModule,
	FormsModule,
	HttpModule,
	ReactiveFormsModule,
	RouterModule.forRoot(appRoutes)
	],
	declarations: [
			CreateEventComponent,
			CollapsibleWellComponent,	
			EventsAppComponent,
			EventslistComponent,
			EventThumbnailComponent,
			EventDetailsComponent,
			Error404Component,
			NavBarComponent,
			CreateSessionComponent,
			SessionListComponent,
			DurationPipe
		],
		providers: [
			AuthService,
			EventService,
			{
				provide: TOASTE_TOKEN,
				useValue: toastr

			},
			EventRouteActivator,
			EventListResolver,
			{
				provide : 'canDeactivateCreateEvent',
				useValue: checkDirtyState
			}
			],
		bootstrap : [EventsAppComponent]
})
export class AppModule{}

	function checkDirtyState(component:CreateEventComponent) {
		if (component.isDirty)
			return window.confirm('You have not saved. Do you want to cancel?')
		return true
	}
