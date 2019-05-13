import { Injectable } from '@angular/core';
import { ProcessFileComponent } from './process-file.component';
import { Route } from '@angular/router';

export const ProcessFileRoute: Route = {
    path: 'process-file',
    component: ProcessFileComponent
};
