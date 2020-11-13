import {AfterViewInit, Component, ElementRef, OnInit, ViewChild,} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {fromEvent, merge, Observable, of as observableOf} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, startWith, switchMap, tap,} from 'rxjs/operators';
import {ApiService} from '../../../../../@core/http/api.service';
import {SnackbarService} from '../../../../../@shared/pages/snackbar/snackbar.service';
import {ItemsService} from '../../../../../@core/services/items.service';
import {ConfirmDialogService} from '../../../../../@shared/pages/dialogs/confirm-dialog/confirm.service';


@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss'],
})
export class ItemsListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'name',
    'brand',
    'image',
    'actions',
  ];
  itemsDatabase: Observable<any> | null;
  data = [];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('input') inputSearch: ElementRef;

  constructor(
    private dialogService: ConfirmDialogService,
    private snackbarService: SnackbarService,
    private itemService: ItemsService,
    private apiserv: ApiService
  ) {
  }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.apiserv
      .getAllInputs('', 'id', 'asc', 0, 0, 'items')
      .subscribe((res) => {
        this.resultsLength = res['meta']['total'];
        this.data = res['data'];
      });
    this.itemService.getAllItemsAdmin().subscribe((res) => {
      this.data = res['data'];
      this.isLoadingResults = false;
    });
  }

  // tslint:disable-next-line:typedef
  ngAfterViewInit() {
    //server-side search
    fromEvent(this.inputSearch.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.apiserv
            .getAllInputs(
              this.inputSearch.nativeElement.value,
              this.sort.active,
              this.sort.direction,
              this.paginator.pageIndex,
              this.paginator.pageSize,
              'items'
            )
            .subscribe((res) => {
              this.data = res['data'];
              this.resultsLength = res['meta']['total'];
            });
        })
      )
      .subscribe();
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.apiserv.getAllInputs(
            this.inputSearch.nativeElement.value,
            this.sort.active,
            this.sort.direction,
            this.paginator.pageIndex,
            this.paginator.pageSize,
            'items'
          );
        }),
        map((data) => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          return data['data'];
        }),
        catchError(() => {
          this.isLoadingResults = false;
          // Catch if the GitHub API has reached its rate limit. Return empty data.
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      )
      .subscribe((data) => (this.data = data));
  }

  // tslint:disable-next-line:typedef

} //end of class
