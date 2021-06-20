import { Attribute } from './attribute';

import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { v4 as uuid } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class AttributeService {

  attributeSelected = new EventEmitter<Attribute>();
  url = `https://localhost:44374/api/Attributes`;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  //Class του attribute με ακομα μια μεθοδο για να μετατρεπει ενα json row σε Attribute object.
  adapter: Attribute = new Attribute();

  //εδω ειναι το list που μπορουν ολα τα components να κανουν subscribe και να εχουν μια
  //up to date λιστα των Attributes της βασης
  private attributes: Attribute[] = new Array<Attribute>();

  //Object για να κανει συγχρονισμο του array απο το service με ενα στο component μεσω Observable.
  private attributesArray: BehaviorSubject<Attribute[]> = new BehaviorSubject<
  Attribute[]
  >(this.attributes);

  constructor(private http: HttpClient) {}

  getAttributesInstance(): Observable<Attribute[]> {
    return this.attributesArray;
  }

  //αποθηκευει στην μεταβλητη employees την λιστα απο την βαση.
  getAllAttributes(): Observable<any> {
    this.attributes = [];
    return this.http.get(this.url).pipe(
      map((data: any) => {
        console.log(data);
        data.map((item: any) => this.attributes.push(this.adapter.adapt(item)));
        //Για να ενημερωθουν ολοι που ακουνε στο Observable του array
        this.attributesArray.next(this.attributes);
        return;
      })
    );
  }

  updateAttribute(attribute: Attribute) {
    console.log(JSON.stringify(attribute));
    return this.http
      .put(
        this.url + '/' + attribute.attrId,
        JSON.stringify(attribute),
        this.httpOptions
      )
      .subscribe({
        error: (error) => {
          console.error('There was an error!', error.message);
        },
      });
  }
   replacer(key:any,value:any)
  {
      if (key=="attrId") return undefined;
      else return value;
  }
  createAttribute(attribute: Attribute) {
    attribute.attrId = uuid();

    return this.http
      .post(this.url, JSON.stringify(attribute), this.httpOptions)
      .subscribe({
        next: (data) => {
          this.getAllAttributes().subscribe();
          console.log('Created attribute with name = ' + attribute.attrName);
        },
        error: (error) => {
          console.error('There was an error!', error.message);
        },
      });
  }

  deleteAttribute(attrId: string) {
    return this.http.delete(this.url + '/' + attrId).subscribe({
      next: (data) => {
        console.log('Delete successful');
        this.getAllAttributes().subscribe();
        //Διάβασα οτι δεν ειναι σωστο να κανεις subscribe μεσα στα Services αλλα δεν μπορεσα να κανω update αλλιως
        //την λιστα μου
      },
      error: (error) => {
        console.error('There was an error!', error.message);
      },
    });
  }

  updateAttributesList() {
    this.getAllAttributes();
  }
}

