import { Component, OnInit } from '@angular/core';
import { LoadingHandlerService } from 'src/app/servicios/loading-handler.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {
  loadingActive: boolean = true;

  constructor(public loadingHandler: LoadingHandlerService) {
    this.loadingHandler.showLoading.subscribe(this.showLoading.bind(this));
  }

  ngOnInit(): void {
  }

  showLoading = (state: boolean): void => {
    this.loadingActive = state;
  }
}