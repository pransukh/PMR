import { Component } from "@angular/core";
import { Button } from "primeng/button";
import { Popover, PopoverModule } from 'primeng/popover';
import { DividerModule } from 'primeng/divider';

@Component({
    standalone: true,
    selector: "ht-app-header",
    templateUrl: "./header.component.html",
    styleUrl: "./header.component.css",
    imports: [Button, Popover, PopoverModule, DividerModule]
})


class Header{

}

export default Header;