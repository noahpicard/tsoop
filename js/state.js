class State {
  objects = [];
  print() {
    this.objects.map((obj) => {
      console.log(obj.str());
    });
  }
  takeStep() {
    this.objects.map((obj) => {
      obj.setupStep(this);
    });
    this.objects.map((obj) => {
      obj.takeStep(this);
    });
  }
}