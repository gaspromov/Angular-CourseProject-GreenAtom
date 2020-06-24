import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  id: number;
  photo_url: string;

  constructor(
    public activatedRoute: ActivatedRoute,
  ) {
    this.activatedRoute.params.subscribe( param => {
      this.id = param.id
    })
   }

  ngOnInit(): void {
    this.photo_url = '/assets/Events/photo' + this.id + '.png';
  }

}
