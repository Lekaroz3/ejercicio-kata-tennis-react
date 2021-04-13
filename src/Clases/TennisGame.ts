import { Player } from "../Interfaces/Player";

export class TennisGame {

  private player1: Player;
  private player2: Player;
  private score:string = '0 - 0'
  private points:string[] = ['0','15','30','40','A']
  private valores:string[][] = [
      ['0','Love'],
      ['15','Fifteen'],
      ['30','Thirty'],
      ['40','Fourty']
  ]

  constructor(player1: Player, player2: Player) {
    this.player1 = player1;
    this.player2 = player2;
  }

  wonPoint(playerName: string):string {
    if (
      this.player1.name.toLocaleLowerCase() === playerName.toLocaleLowerCase()
    ) {
      const puntuaciones: string[] = this.incrementPoint(
        this.player1.puntuacion,
        this.player2.puntuacion
      );
      if (puntuaciones.length == 0) {
        return '';
      }
      this.player1.puntuacion = puntuaciones[0];
      this.player2.puntuacion = puntuaciones[1];
      return `${this.player1.puntuacion} - ${this.player2.puntuacion}`;
    } else {
      const puntuaciones: string[] = this.incrementPoint(
        this.player2.puntuacion,
        this.player1.puntuacion
      );
      if (puntuaciones.length == 0) {
        return '';
      }
      this.player2.puntuacion = puntuaciones[0];
      this.player1.puntuacion = puntuaciones[1];
      return `${this.player1.puntuacion} - ${this.player2.puntuacion}`;
    }
  }

  getScore():string {
    let score:string = `${this.player1.puntuacion} - ${this.player2.puntuacion}`
    return this.traducirScore(score)
  }

  incrementPoint(pointToIncrement: string, rivalPoint: string): string[] {
    if (pointToIncrement === "W" || rivalPoint === "W") {
      return [];
    }
    if (pointToIncrement === "A") {
      return ["W", rivalPoint];
    }else if(pointToIncrement === "40" && rivalPoint === 'A'){
        return ["40", "40"];  
    } else if (
      pointToIncrement === "40" &&
      (rivalPoint === "40" || rivalPoint === "A")
    ) {
      return ["A", "40"];
    } else if (pointToIncrement === "40" && rivalPoint !== "40") {
      return ["W", rivalPoint];
    } else {
      return [ this.getNextPoint(pointToIncrement), rivalPoint];
    }

    
  }
  private getNextPoint(point:string):string {
      const indexOfPoint:number = this.points.indexOf(point)
      return this.points[indexOfPoint+1]
  }

  private traducirScore(score:string):string{
      if(score.substring(0,1) === 'W'){
          return `Win ${this.player1.name}`
      }else if(score.substring(score.length-1) === 'W'){
        return `Win ${this.player2.name}`
      }
      switch(score){
          case '0 - 0':{
            return 'Love all'
          }
          case '15 - 15':{
              return 'Fifteen all'
          }
          case '30 - 30':{
              return 'Thirty all'
          }
          case '40 - 40':{
              return 'Deuce'
          }
          case 'A - 40':{
              return `Advantage ${this.player1.name}`
          }
          case '40 - A':{
            return `Advantage ${this.player2.name}`
          }
          default:{
              let scoreTraducido: string = `${this.traducirPoint(this.player1.puntuacion)} - ${this.traducirPoint(this.player2.puntuacion)}`
              return scoreTraducido
          }
              
      }
  }

  private traducirPoint(point:string){
      for (let i = 0; i < this.valores.length; i++) {
          if(this.valores[i][0] == point){
              return this.valores[i][1]
          }          
      }
  } 
}
