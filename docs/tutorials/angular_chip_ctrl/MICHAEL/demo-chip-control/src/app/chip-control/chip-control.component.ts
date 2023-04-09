import { Component, ElementRef, forwardRef, Input, OnInit, ViewChild } from "@angular/core";
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from "@angular/forms";
import { MatChipInputEvent } from "@angular/material/chips";
import { MatAutocomplete, MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import { Observable } from "rxjs";
import { debounceTime, distinctUntilChanged, map, startWith } from "rxjs/operators";

const CONTROL_VALUE_ACCESSOR_PROVIDER = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ChipControlComponent),
    multi: true,
};

@Component({
    selector: "app-chip-control",
    templateUrl: "./chip-control.component.html",
    styleUrls: ["./chip-control.component.css"],
    providers: [
        CONTROL_VALUE_ACCESSOR_PROVIDER
    ]
})
export class ChipControlComponent implements OnInit, ControlValueAccessor {
    items: string[] = [];
    itemInputControl = new FormControl();

    @ViewChild("itemInput")
    itemInput: ElementRef<HTMLInputElement>;

    @ViewChild("autocomplete")
    matAutocomplete: MatAutocomplete;

    @Input()
    suggestions: string[] = [];

    currentSuggestions: Observable<string[]>;

    private onChangeProvided: Function = () => {};
    private onTouchProvided: Function = () => {};

    constructor () {
        this.currentSuggestions = this.itemInputControl.valueChanges.pipe(
            startWith(null),
            debounceTime(300),
            distinctUntilChanged(),
            map((input: string | null) => input ? this.filterSuggestions(input) : [...this.suggestions])
        )
    }

    ngOnInit (): void {
    }

    addChip (event: MatChipInputEvent) {
        const { input, value } = event;

        if ((value || "").trim()) {
            this.items.push(value.trim());
            this.onChangeProvided(this.items);
            this.onTouchProvided();
        }

        if (input) {
            input.value = "";
        }

        this.itemInputControl.setValue(null);
    }

    removeChip (item: string) {
        const index = this.items.indexOf(item);

        if (index >= 0) {
            this.items.splice(index, 1);
            this.onChangeProvided(this.items);
            this.onTouchProvided();
        }
    }

    selectAutocomplete (event: MatAutocompleteSelectedEvent) {
        this.items.push(event.option.viewValue);
        this.itemInput.nativeElement.value = "";
        this.itemInputControl.setValue(null);
        this.onChangeProvided(this.items);
        this.onTouchProvided();
    }

    filterSuggestions (input: string) {
        return this.suggestions.filter(
            suggestion => suggestion.toLowerCase().startsWith(input.trim().toLowerCase())
        );
    }

    registerOnChange (fn: any): void {
        this.onChangeProvided = fn;
    }

    registerOnTouched (fn: any): void {
        this.onTouchProvided = fn;
    }

    writeValue (obj: any): void {
        if (!obj) return;
        this.items = [...obj];
    }
}
