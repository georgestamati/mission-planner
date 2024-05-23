import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Point } from './planner.interface';
import { PointsService } from '../../services/points.service';

@Component({
  selector: 'app-planner',
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.scss'],
})
export class PlannerComponent implements OnInit {
  pointForm!: FormGroup;
  points: Point[] = [];

  displayedColumns: string[] = ['index', 'name', 'x', 'y'];
  dataSource = new MatTableDataSource<Point>(this.points);

  constructor(private fb: FormBuilder, private pointsService: PointsService) {}

  ngOnInit(): void {
    this.initForm();
    this.loadPoints();
  }

  initForm() {
    this.pointForm = this.fb.group({
      name: ['', Validators.required],
      x: [0, Validators.required],
      y: [0, Validators.required],
    });
  }

  addPoint(): void {
    const newPoint: Point = this.pointForm.value;
    this.points.push(newPoint);
    this.dataSource.data = this.points;
    this.savePoints();
    this.resetForm();
  }

  resetForm(): void {
    this.pointForm.reset({ name: '', x: 0, y: 0 });
  }

  savePoints(): void {
    const items = JSON.stringify(this.points);
    this.pointsService.saveItems('points', items);
  }

  loadPoints() {
    this.points = this.pointsService.loadItems('points');
    this.dataSource.data = this.points;
  }
}
