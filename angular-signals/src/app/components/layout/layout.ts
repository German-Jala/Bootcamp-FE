import { Component, inject, signal } from '@angular/core';
import { UserRole } from '../../types/userRole';
import { CommonModule } from '@angular/common';
import { Header } from './components/header/header';
import { Navbar } from './components/navbar/navbar';
import { Sidebar } from './components/sidebar/sidebar';

@Component({
  selector: 'app-layout',
  imports: [CommonModule, Header, Navbar, Sidebar],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {
  protected userRole = signal<UserRole>('admin');
  protected isSidebarCollapse = signal<boolean>(false);

  protected toogleSidebarCollapse = () => {
    this.isSidebarCollapse.update(value => !value);
  }
  protected changeUserRole = (userRole: UserRole) => {
    this.userRole.set(userRole);
  }
}
