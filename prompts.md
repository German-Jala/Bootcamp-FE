##Is there a form to use something like
```
  protected readonly recipeForm = this.formBuilder.group<Omit<RecipeModel, 'id'>>({

    name: ['', Validators.required],

    description: ['', Validators.required],

    imgUrl: ['', Validators.required],

    isFavorite: [false, Validators.required],

  }); 
```

Answer
Yes, a helper called ToFormControl

## Get values and pass throught parameter

```

  protected readonly recipeForm = this.formBuilder.group<ToFormControls<Omit<RecipeModel, 'id' | 'ingredients'>>>({
    name: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    description: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    imgUrl: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    isFavorite: new FormControl(false, { validators: [Validators.required], nonNullable: true }),
  });

  protected addRecipe() {
    if (this.recipeForm.valid) {
      this.recipeForm.value;
      console.log(this.recipeForm.value)
      this.recipeForm.reset;
    }
    this.recipeService.addRecipe({...this.recipeForm.getRawValue(), ingredients: []});
```
Answer, getRawValue gives us the value of the form without hidden properties.