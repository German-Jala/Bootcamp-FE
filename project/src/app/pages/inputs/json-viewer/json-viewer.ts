import { Component, input } from '@angular/core';

type User = {
  id: number;
  name: string;
  email: string;
  active: boolean;
  role: string;
  loginCount: number;
};

@Component({
  selector: 'app-json-viewer',
  imports: [],
  templateUrl: './json-viewer.html',
})
export class JsonViewer {
  user = input.required<User>();

  logUser() {
    const currentUser = this.user();

    console.log('Example 2 - User recibido del padre:');
    console.log(currentUser);

    console.log('Example 2 - Resumen del usuario:');
    console.log({
      id: currentUser.id,
      name: currentUser.name,
      role: currentUser.role,
      status: currentUser.active ? 'Active user' : 'Inactive user',
      loginCount: currentUser.loginCount,
    });

    console.log('Example 2 - User como JSON:');
    console.log(JSON.stringify(currentUser, null, 2));
  }
}
