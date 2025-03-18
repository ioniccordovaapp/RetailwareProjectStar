import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private renderer: Renderer2;
  private darkThemeClass = 'dark-theme';
  private lightThemeClass = 'light-theme';
  private highContrastThemeClass = 'high-contrast-theme'; // New class for high contrast theme

  constructor(private rendererFactory: RendererFactory2) {
    this.renderer = this.rendererFactory.createRenderer(null, null);

    // Apply saved theme on initialization
    const savedTheme = localStorage.getItem('theme') || 'light';
    this.applyTheme(savedTheme); // Set theme on initialization
  }

  // Toggle between themes
  toggleThemes(theme: any): void {
    this.applyTheme(theme);
    localStorage.setItem('theme', theme); // Persist the chosen theme
  }

  // Set the theme
  setTheme(theme: string): void {
    // Remove existing theme classes
    this.renderer.removeClass(document.body, this.darkThemeClass);
    this.renderer.removeClass(document.body, this.lightThemeClass);
    this.renderer.removeClass(document.body, this.highContrastThemeClass); // Remove high contrast theme

    // Add the selected theme class
    switch (theme) {
      case 'dark':
        this.renderer.addClass(document.body, this.darkThemeClass);
        break;
      case 'light':
        this.renderer.addClass(document.body, this.lightThemeClass);
        break;
      case 'high-contrast':
        this.renderer.addClass(document.body, this.highContrastThemeClass);
        break;
      default:
        break;
    }
  }

  // Apply the theme
  applyTheme(theme: string): void {
    this.setTheme(theme); // Apply the theme based on the passed argument
  }

  // Retrieve the saved theme or default to 'light'
  getSavedTheme(): string {
    return localStorage.getItem('theme') || 'light'; // Default to light theme
  }
}
