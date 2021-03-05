import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface ResidentesItem {
  nome: string;
  casa: number;
  ramal:number;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: ResidentesItem[] = [
  {casa: 1, nome: 'Carlos', ramal: 8888},
  {casa: 2, nome: 'Luiza', ramal: 8888},
  {casa: 3, nome: 'Cecilia', ramal: 8888},
  {casa: 4, nome: 'Lucas', ramal: 8888},
  {casa: 5, nome: 'Cristian', ramal: 8888},
  {casa: 6, nome: 'João', ramal: 8888},
  {casa: 7, nome: 'Thomas', ramal: 8888},
  {casa: 8, nome: 'Letícia', ramal: 8888},
  {casa: 9, nome: 'Nelson', ramal: 8888},
  {casa: 10, nome: 'Júlia', ramal: 8888},
  {casa: 11, nome: 'Alex', ramal: 8888},
  {casa: 12, nome: 'João', ramal: 8888},
  {casa: 13, nome: 'Cleber', ramal: 8888},
  {casa: 14, nome: 'Amanda', ramal: 8888},
  {casa: 15, nome: 'Roberto', ramal: 8888},
  {casa: 16, nome: 'Paulo', ramal: 8888},
  {casa: 17, nome: 'Patrícia', ramal: 8888},
  {casa: 18, nome: 'Nicole', ramal: 8888},
  {casa: 19, nome: 'Ana', ramal: 8888},
  {casa: 20, nome: 'Felipe', ramal: 8888},
];

/**
 * Data source for the Residentes view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class ResidentesDataSource extends DataSource<ResidentesItem> {
  data: ResidentesItem[] = EXAMPLE_DATA;
  paginator: MatPaginator;
  sort: MatSort;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<ResidentesItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: ResidentesItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: ResidentesItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'nome': return compare(a.nome, b.nome, isAsc);
        case 'casa': return compare(+a.casa, +b.casa, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example casa/nome columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
