import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class AppConstants {

    public image = {
        WIDTH : 1280,
        HEIGHT : 720
    }

    public sizes: string[] = ['0 cm', '> 0.5cm', '> 5cm', '> 5cm or confluence'];
    public scores: number[] = [0, 1, 2, 3];
    public probabilities: string[] = ['Certain', 'Average', 'Low'];
    public retractiles: Boolean[] = [true, false];
    public adherants: Boolean[] = [true, false];
    public colors: string[] = ["Jaunâtre", "Verdatre"];
    public types: string[] = ["Hétérogène", "Homogène"];

}
