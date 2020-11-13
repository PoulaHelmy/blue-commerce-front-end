import {Component, OnInit} from '@angular/core';
import {ConfirmDialogService} from '../../../../../@shared/pages/dialogs/confirm-dialog/confirm.service';
import {SnackbarService} from '../../../../../@shared/pages/snackbar/snackbar.service';
import {Router} from '@angular/router';
import {ItemsService} from '../../../../../@core/services/items.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  items = [];
  isLoadingResults = true;

  // @ts-ignore
  constructor(
    private dialogService: ConfirmDialogService,
    private snackbarService: SnackbarService,
    private itemService: ItemsService,
    private router: Router
  ) {
  }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.itemService.getAllItems('products/all').subscribe((res) => {
      this.items = res['data'];
      this.isLoadingResults = false;
    });
  }


}
