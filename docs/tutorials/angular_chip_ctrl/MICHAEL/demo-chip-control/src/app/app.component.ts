import { Component } from "@angular/core";
import { FormControl } from "@angular/forms";

// Just a list of suggestions
const SUGGESTIONS: string[] = [
    "honda civic",
    "honda accord",
    "toyota supra",
    "toyota camry",
    "subaru wrx",
    "subaru brz",
    "subaru forester",
    "bmw m5",
    "bmw x7",
    "bmw i8",
    "mercedes benz",
    "audi",
    "chevrolet",
    "ford",
    "lincoln",
    "cadillac",
];

@Component({
    selector: "app-root",
    template: `
        <div class="content">
            <mat-card>
                <h3>Template form</h3>
                <form>
                    <app-chip-control [suggestions]="suggestions" [(ngModel)]="templateModel"
                                      name="chip"></app-chip-control>
                </form>
                <pre>Control value: {{ templateModel | json }}</pre>
            </mat-card>
            <mat-card>
                <h3>Reactive form</h3>
                <form>
                    <app-chip-control [suggestions]="suggestions" [formControl]="reactiveControl"></app-chip-control>
                </form>
                <pre>Control value: {{ reactiveControl.value | json }}</pre>
            </mat-card>
        </div>

    `,
    styles: []
})
export class AppComponent {
    suggestions = SUGGESTIONS;
    templateModel: string[] = ["bmw"];
    reactiveControl: FormControl = new FormControl(["subaru brz", "honda nsx"]);
}
