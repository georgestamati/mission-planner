import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Point } from '../planner/planner.interface';
import { PointsService } from '../../services/points.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnInit {
  @ViewChild('visualizationArea', { static: true }) visualizationArea!: ElementRef<SVGSVGElement>;

  points: Point[] = [];
  isPlaying: boolean = false;
  currentIndex: number = 0;
  intervalId: any;
  blackPoint: ElementRef<SVGCircleElement> | undefined;
  animationDuration: number = 10000;

  displayedColumns: string[] = ['index', 'name'];
  dataSource = new MatTableDataSource<Point>(this.points);

  constructor(private pointsService: PointsService, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.loadPoints();
    this.renderPoints();
  }

  loadPoints() {
    this.points = this.pointsService.loadItems('points');
    this.dataSource.data = this.points;
  }

  renderPoints(): void {
    const svg = this.visualizationArea.nativeElement;
    const margin = 50;

    const minX = Math.min(...this.points.map((point) => point.x)) - margin;
    const minY = Math.min(...this.points.map((point) => point.y)) - margin;
    const maxX = Math.max(...this.points.map((point) => point.x)) + margin;
    const maxY = Math.max(...this.points.map((point) => point.y)) + margin;
    const viewBox = `${minX} ${minY} ${maxX - minX} ${maxY - minY}`;
    this.renderer.setAttribute(svg, 'viewBox', viewBox);

    // Render points
    for (let i = 0; i < this.points.length; i++) {
      const point = this.points[i];
      const circle = this.renderer.createElement('circle', 'svg');
      this.renderer.setAttribute(circle, 'cx', String(point.x));
      this.renderer.setAttribute(circle, 'cy', String(point.y));
      this.renderer.setAttribute(circle, 'r', '5');
      this.renderer.setAttribute(circle, 'fill', 'red');
      this.renderer.appendChild(svg, circle);

      // Render lines connecting points
      if (i < this.points.length - 1) {
        const nextPoint = this.points[i + 1];
        const line = this.renderer.createElement('line', 'svg');
        this.renderer.setAttribute(line, 'x1', String(point.x));
        this.renderer.setAttribute(line, 'y1', String(point.y));
        this.renderer.setAttribute(line, 'x2', String(nextPoint.x));
        this.renderer.setAttribute(line, 'y2', String(nextPoint.y));
        this.renderer.setAttribute(line, 'stroke', 'grey');
        this.renderer.setAttribute(line, 'stroke-width', '1');
        this.renderer.setAttribute(line, 'stroke-dasharray', '3,7');
        this.renderer.appendChild(svg, line);
      }
    }

    // Render black point
    this.blackPoint = this.renderer.createElement('circle', 'svg');
    this.renderer.setAttribute(this.blackPoint, 'cx', String(this.points[0].x));
    this.renderer.setAttribute(this.blackPoint, 'cy', String(this.points[0].y));
    this.renderer.setAttribute(this.blackPoint, 'r', '5');
    this.renderer.setAttribute(this.blackPoint, 'fill', 'black');
    this.renderer.appendChild(svg, this.blackPoint);
  }

  playMission(): void {
    if (this.isPlaying) return;

    this.isPlaying = true;
    let currentIndex = 0;
    const intervalDuration = this.animationDuration / (this.points.length - 1);

    const interval = setInterval(() => {
      currentIndex++;
      if (currentIndex >= this.points.length) {
        clearInterval(interval);
        this.isPlaying = false;
        return;
      }

      const nextPoint = this.points[currentIndex];
      this.animateBlackPoint(nextPoint.x, nextPoint.y);
    }, intervalDuration);
  }

  stopMission(): void {
    this.isPlaying = false;
    clearInterval(this.intervalId);
  }

  private animateBlackPoint(x: number, y: number): void {
    if (!this.blackPoint) return;

    const animation = this.renderer.createElement('animateMotion', 'svg');
    const currentPoint = this.points[this.currentIndex];
    const nextPoint = { x, y };

    // Calculate the control point for the animation curve
    const controlPointX = (currentPoint.x + nextPoint.x) / 2;
    const controlPointY = (currentPoint.y + nextPoint.y) / 2;

    // Define the path for the animation curve (cubic Bezier curve)
    const path = `M${currentPoint.x},${currentPoint.y} Q${controlPointX},${controlPointY} ${nextPoint.x},${nextPoint.y}`;
    this.renderer.setAttribute(animation, 'path', path);
    this.renderer.setAttribute(animation, 'dur', `${this.animationDuration}ms`);
    this.renderer.setAttribute(animation, 'fill', 'freeze');

    this.renderer.appendChild(this.blackPoint, animation);
  }
}
