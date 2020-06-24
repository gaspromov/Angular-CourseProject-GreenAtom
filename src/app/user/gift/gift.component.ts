import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-gift',
  templateUrl: './gift.component.html',
  styleUrls: ['./gift.component.css']
})
export class GiftComponent implements OnInit {
  id: number;
  photo_url: string;

  constructor(
    public activatedRoute: ActivatedRoute
  ) { 
    this.activatedRoute.params.subscribe( param => {
      this.id = param.id;
    })
  }

  ngOnInit(): void {
    this.photo_url = 'assets/Gifts/photo' + this.id + ".png";
  }

}
