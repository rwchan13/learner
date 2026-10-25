export interface RawPassenger {
  PassengerId: string;
  Survived: string;
  Pclass: string;
  Name: string;
  Sex: string;
  Age: string;
  SibSp: string;
  Parch: string;
  Ticket: string;
  Fare: string;
  Cabin: string;
  Embarked: string;
}

export interface Passenger {
  passengerId: number;
  survived: boolean;
  pclass: number;
  name: string;
  sex: 'male' | 'female';
  age: number | null; // handle missing values
  sibSp: number;
  parch: number;
  ticket: string;
  fare: number;
  cabin: string;
  embarked: string;
  familySize: number; // SibSp + Parch + 1
}
