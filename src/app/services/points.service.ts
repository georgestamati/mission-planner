import { Injectable } from '@angular/core';
import { Point } from '../components/planner/planner.interface';

@Injectable({
  providedIn: 'root',
})
export class PointsService {
  saveItems(key: string, items: string): void {
    localStorage.setItem(key, JSON.stringify(items));
  }
  loadItems(key: string): Point[] {
    const items = localStorage.getItem(key);

    return items ? JSON.parse(items) : [];
  }
}
