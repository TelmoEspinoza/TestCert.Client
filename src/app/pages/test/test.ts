import { Component, OnInit, signal, computed } from '@angular/core';
import { TestService } from '../../services/test-service';
import { Testmodel } from '../../models/testmodel';
import { FormsModule } from '@angular/forms';
import { EMPTY } from 'rxjs';
@Component({
  selector: 'app-test',
  imports: [FormsModule],
  templateUrl: './test.html',
  styleUrl: './test.css',
})
export class Test implements OnInit {
  //tests: Testmodel[] = []; // Array to hold fetched posts
  tests = signal<Testmodel[]>([]);
  loading = signal(true);
  error = signal('');
  selectedTest: Testmodel | null = null;
  newTest: Testmodel = { testId: 0, ktReferenceNumber: '', description: '', total: 0 };

  isEmpty = computed(() => !this.loading() && !this.error() && this.tests().length === 0);

  constructor(private readonly testService: TestService) {}

  ngOnInit(): void {
    this.loadTests();
  }

  loadTests(): void {
    this.testService.getTests().subscribe({
      next: (data) => {
        this.tests.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.error.set('Failed to load products');
        this.loading.set(false);
      },
    });
  }
  onSaveTest() {
    //create
    if (this.newTest.testId === 0) {
      this.testService.createTest(this.newTest).subscribe({
        next: (result) => {
          this.loadTests();
        },
        error: (err) => {
          console.error(err);
          this.error.set('Failed to create a new the test');
        },
      });
    }
    //update
    else {
      this.testService.updateTest(this.newTest.testId, this.newTest).subscribe({
        next: (result) => {
          this.loadTests();
        },
        error: (err) => {
          console.error(err);
          this.error.set('Failed to update a new the test');
        },
      });
    }
    this.reset();
  }

  onEditTest(test: Testmodel) {
    this.newTest = { ...test };
  }
  onDeleteTest(testId: number) {
    this.testService.deleteTest(testId).subscribe({
      next: (result) => {
        this.loadTests();
      },
      error: (err) => {
        console.error(err);
        this.error.set('Failed to Detele the test');
      },
    });
  }

  openTestModal(test: Testmodel) {
    this.selectedTest = test;
  }
  closeTestModal() {
    this.selectedTest = null;
  }
  reset() {
    this.newTest.testId = 0;
    this.newTest.ktReferenceNumber = '';
    this.newTest.description = '';
    this.newTest.total = 0;
  }
}
