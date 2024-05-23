import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Point } from './planner.interface';

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

  constructor(private fb: FormBuilder) {}

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
    localStorage.setItem('points', JSON.stringify(this.points));
  }

  loadPoints(): void {
    const savedPoints = localStorage.getItem('points');
    if (savedPoints) {
      this.points = JSON.parse(savedPoints);
      this.dataSource.data = this.points;
    }
  }
}
