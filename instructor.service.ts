import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class InstructorService {
  private base = 'http://localhost:5000/api/instructor';

  constructor(private http: HttpClient) {}

  getCourses() { return this.http.get<any[]>(`${this.base}/courses`); }
  addCourse(course: any) { return this.http.post(`${this.base}/courses`, course); }
  deleteCourse(id: string) { return this.http.delete(`${this.base}/courses/${id}`); }

  getStatus() { return this.http.get<any[]>(`${this.base}/status`); }
  submitStatus(status: any) { return this.http.post(`${this.base}/status`, status); }
}
