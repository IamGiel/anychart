import { trigger, state, style, animate, transition, keyframes, query, stagger, group, animateChild } from '@angular/animations';

export let toggler = trigger('toggler', [
    state('small', style({ height: '100%' })),
    state('large', style({ height: '0px' })),
    transition('large=>small', animate('1000ms')),
    transition('small=>large', animate('2000ms'))
]);
export let toggler2 = trigger('toggler2', [
    state('small', style({ height: '0px' })),
    state('large', style({ height: '100%' })),
    transition('large <=> small', animate('300ms ease-in'))
]);
