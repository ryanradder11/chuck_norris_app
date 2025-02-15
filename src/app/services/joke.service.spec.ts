import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { JokeService } from './joke.service';

describe('JokeService', () => {
  let service: JokeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [JokeService]
    });
    service = TestBed.inject(JokeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should throw an error for invalid count', () => {
    expect(() => service.getJokes(0)).toThrow(new Error('Invalid count'));
    expect(() => service.getJokes(-1)).toThrow(new Error('Invalid count'));
    expect(() => service.getJokes(NaN)).toThrow(new Error('Invalid count'));
  });
});
