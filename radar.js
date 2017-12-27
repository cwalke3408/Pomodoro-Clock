class radar{
    constructor() {
        this.ORGIN_X = 200;
        this.ORGIN_Y = 200;
        this.RADIUS = 125;
    }

    display(){
        stroke("#422D07");
        ellipse(ORGIN_X, ORGIN_Y, RADIUS*2, RADIUS*2);
        strokeWeight(2);
        ellipse(ORGIN_X, ORGIN_Y, (RADIUS*2)/1.5, (RADIUS*2)/1.5);
        ellipse(ORGIN_X, ORGIN_Y, (RADIUS*2)/3, (RADIUS*2)/3);
        line(ORGIN_X,ORGIN_Y-RADIUS, ORGIN_X, ORGIN_Y+RADIUS);
        line(ORGIN_X-RADIUS,ORGIN_Y, ORGIN_X+RADIUS, ORGIN_Y);
    }

    sailing(ANGLE, MOVE){
        fill("#000F07");
        stroke("#785006");
        strokeWeight(5);

        line(ORGIN_X, ORGIN_Y, RADIUS * Math.cos(ANGLE) + ORGIN_X, RADIUS * Math.sin(ANGLE) + ORGIN_Y);
        ellipse(ORGIN_X+ MOVE, ORGIN_Y-20, 3, 3);
    }
}
