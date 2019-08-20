import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-capitulouno',
  templateUrl: './capitulouno.component.html',
  styles: [
    `
    .star {
      font-size: 2.0rem;
      color: #b0c4de;
    }

    .filled {
      color: #F5D11E;
    }
  `
  ]
})
export class CapitulounoComponent implements OnInit {

  public isCollapsed = false;
  public isCollapseddos = true;
  public isCollapsedtres = true;
  public isCollapsedcuatro = true;

  public currentRate = 1;
  constructor() { }

  ngOnInit() {
  }

  uno(){  
  this.isCollapsed = false;
  this.isCollapseddos = true;
  this.isCollapsedtres = true;
  this.isCollapsedcuatro = true;
  }

  dos(){  
  this.isCollapsed = true;
  this.isCollapseddos = false;
  this.isCollapsedtres = true;
  this.isCollapsedcuatro = true;
  }

  tres(){  
  this.isCollapsed = true;
  this.isCollapseddos = true;
  this.isCollapsedtres = false;
  this.isCollapsedcuatro = true;
      }

  cuatro(){  
  this.isCollapsed = true;
  this.isCollapseddos = true;
  this.isCollapsedtres = true;
  this.isCollapsedcuatro = false;
  }
}
