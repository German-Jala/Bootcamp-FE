import { Component, input, output, signal, Signal, WritableSignal } from '@angular/core';
import { UserRole } from '../../../../types/userRole';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  userRole = input.required<UserRole>({ alias: 'setUserRole' });
  isSidebarCollapse = input.required<boolean>({ alias: 'setIsSidebarCollapse' });
  handleOnClickCollapse = output<void>();

  protected onClickCollapse = () => {
    this.handleOnClickCollapse.emit();
  }
}
