import { Component, ElementRef, Input, Renderer } from '@angular/core';

@Component({
    selector: 'jhi-password-strength-bar',
    template: `
        <div id="strength">
            <small jhiTranslate="global.messages.validate.newpassword.strength">Password strength:</small>
            <ul id="strengthBar" style="margin-right:10px;">
                <li class="point"></li>
                <li class="point"></li>
                <li class="point"></li>
                <li class="point"></li>
                <li class="point"></li>
            </ul>
            <ng-template #popContent>
            <div style="margin-top:15px;">
            <ul>
                <li> 
                    Your password has to be at least 4 characters long.
                </li>
                <li> 
                    Must contain at least one lower case letter,
                </li>
                <li> 
                    one upper case letter,
                </li>
                <li> 
                    one digit,
                </li>
                <li> 
                    one special character like ~!@#$%^&*()_+
                </li>
            </ul>
            
           
            </div>
              
                
                
            </ng-template>
            <i-info style="cursor:pointer;width:13px;" class="featherinfo" [ngbPopover]="popContent" triggers="click" placement="right">  
            </i-info>
        </div>`,
    styleUrls: ['password-strength-bar.css']
})
export class PasswordStrengthBarComponent {
    colors = ['#F00', '#F90', '#FF0', '#9F0', '#0F0'];

    constructor(private renderer: Renderer, private elementRef: ElementRef) {}

    measureStrength(p: string): number {
        let force = 0;
        const regex = /[$-/:-?{-~!"^_`\[\]]/g; // "
        const lowerLetters = /[a-z]+/.test(p);
        const upperLetters = /[A-Z]+/.test(p);
        const numbers = /[0-9]+/.test(p);
        const symbols = regex.test(p);

        const flags = [lowerLetters, upperLetters, numbers, symbols];
        const passedMatches = flags.filter((isMatchedFlag: boolean) => {
            return isMatchedFlag === true;
        }).length;

        force += 2 * p.length + (p.length >= 10 ? 1 : 0);
        force += passedMatches * 10;

        // penality (short password)
        force = p.length <= 6 ? Math.min(force, 10) : force;

        // penality (poor variety of characters)
        force = passedMatches === 1 ? Math.min(force, 10) : force;
        force = passedMatches === 2 ? Math.min(force, 20) : force;
        force = passedMatches === 3 ? Math.min(force, 40) : force;

        return force;
    }

    getColor(s: number): any {
        let idx = 0;
        if (s <= 10) {
            idx = 0;
        } else if (s <= 20) {
            idx = 1;
        } else if (s <= 30) {
            idx = 2;
        } else if (s <= 40) {
            idx = 3;
        } else {
            idx = 4;
        }
        return { idx: idx + 1, col: this.colors[idx] };
    }

    @Input()
    set passwordToCheck(password: string) {
        if (password) {
            const c = this.getColor(this.measureStrength(password));
            const element = this.elementRef.nativeElement;
            if (element.className) {
                this.renderer.setElementClass(element, element.className, false);
            }
            const lis = element.getElementsByTagName('li');
            for (let i = 0; i < lis.length; i++) {
                if (i < c.idx) {
                    this.renderer.setElementStyle(lis[i], 'backgroundColor', c.col);
                } else {
                    this.renderer.setElementStyle(lis[i], 'backgroundColor', '#DDD');
                }
            }
        }
    }
}
