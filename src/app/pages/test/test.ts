import { Component, OnInit, signal, computed, Signal } from '@angular/core';
import { TestService } from '../../services/test-service';
import { EquipmentService } from '../../services/equipment-service';
//import { TestResponseDto as TestDto } from '../../dtos/TestResponseDto';
import { TestDto } from '../../dtos/TestDto';
import { FormsModule } from '@angular/forms';
import { EMPTY } from 'rxjs';
import { Equipmentmodel } from '../../dtos/equipmentmodel';
@Component({
  selector: 'app-test',
  imports: [FormsModule],
  templateUrl: './test.html',
  styleUrl: './test.css',
})
export class Test implements OnInit {
  //tests: Testmodel[] = []; // Array to hold fetched posts
  tests = signal<TestDto[]>([]);
  loading = signal(true);
  isEquipmenteEmpty = signal(true);
  error = signal('');
  selectedTest: TestDto | null = null;
  equipments = signal<Equipmentmodel[]>([]);
  newTest: TestDto = { testId : 0, ktReferenceNumber: '', description: '', total: 0 };

  isEmpty = computed(() => !this.loading() && !this.error() && this.tests().length === 0);

  constructor(
    private readonly testService: TestService,
    private readonly equipmentService: EquipmentService,
  ) {}

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
        this.error.set('Failed to load TESTS');
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

  onEditTest(test: TestDto) {
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

  openTestModal(test: TestDto) {
    this.selectedTest = test;
    this.loadEquipments(test.testId);
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

  loadEquipments(testId: number): void {
    this.testService.getEquipmentsByTestId(testId).subscribe({
      next: (data) => {
        this.equipments.set(data);
        this.isEquipmenteEmpty.set(false);
      },
      error: (err) => {
        console.error(err);
        this.error.set('Failed to load equipments');
         this.isEquipmenteEmpty.set(true);
      },
    });
  }
}
