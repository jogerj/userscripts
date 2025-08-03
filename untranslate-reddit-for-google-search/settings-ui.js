// Settings UI Module for Reddit Untranslate
// This module handles the creation and management of the settings interface

(function() {
  'use strict';

  class SettingsUI {
    constructor(settings) {
      this.settings = settings;
      this.settingsBtn = null;
      this.settingsPanel = null;
    }

    async saveSettings() {
      await GM_setValue('UPDATE_TITLE', this.settings.updateTitle);
      await GM_setValue('UPDATE_LINKS', this.settings.updateLinks);
    }

    createButton() {
      this.settingsBtn = document.createElement('div');
      this.settingsBtn.id = 'reddit-untranslate-settings-btn';
      this.settingsBtn.innerHTML = '⚙️';
      this.settingsBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 40px;
        height: 40px;
        background: #fff;
        border: 2px solid #ddd;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        z-index: 10000;
        transition: all 0.3s ease;
      `;

      // Hover effects
      this.settingsBtn.addEventListener('mouseenter', () => {
        this.settingsBtn.style.transform = 'scale(1.1)';
        this.settingsBtn.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
      });

      this.settingsBtn.addEventListener('mouseleave', () => {
        this.settingsBtn.style.transform = 'scale(1)';
        this.settingsBtn.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
      });

      return this.settingsBtn;
    }

    createPanel() {
      this.settingsPanel = document.createElement('div');
      this.settingsPanel.id = 'reddit-untranslate-settings-panel';
      this.settingsPanel.style.cssText = `
        position: fixed;
        bottom: 70px;
        right: 20px;
        width: 250px;
        background: #fff;
        border: 2px solid #ddd;
        border-radius: 8px;
        padding: 15px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        z-index: 10001;
        display: none;
        font-family: Arial, sans-serif;
        font-size: 14px;
      `;

      this.settingsPanel.innerHTML = `
        <div style="margin-bottom: 15px; font-weight: bold; color: #333;">
          Reddit Untranslate Settings
        </div>
        <label style="display: flex; align-items: center; margin-bottom: 10px; cursor: pointer;">
          <input type="checkbox" id="update-title-checkbox" ${this.settings.updateTitle ? 'checked' : ''} 
                 style="margin-right: 8px;">
          <span>Untranslate Titles</span>
        </label>
        <label style="display: flex; align-items: center; margin-bottom: 15px; cursor: pointer;">
          <input type="checkbox" id="update-links-checkbox" ${this.settings.updateLinks ? 'checked' : ''} 
                 style="margin-right: 8px;">
          <span>Update links to show original</span>
        </label>
        <div style="text-align: center;">
          <button id="apply-settings-btn" style="
            background: #4285f4;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 12px;
          ">Apply & Reload</button>
        </div>
      `;

      return this.settingsPanel;
    }

    attachEventListeners() {
      // Toggle panel visibility
      this.settingsBtn.addEventListener('click', () => {
        const isVisible = this.settingsPanel.style.display === 'block';
        this.settingsPanel.style.display = isVisible ? 'none' : 'block';
        this.settingsBtn.style.background = isVisible ? '#fff' : '#f0f0f0';
      });

      // Close panel when clicking outside
      document.addEventListener('click', (e) => {
        if (!this.settingsBtn.contains(e.target) && !this.settingsPanel.contains(e.target)) {
          this.settingsPanel.style.display = 'none';
          this.settingsBtn.style.background = '#fff';
        }
      });

      // Apply settings button
      document.getElementById('apply-settings-btn').addEventListener('click', async () => {
        this.settings.updateTitle = document.getElementById('update-title-checkbox').checked;
        this.settings.updateLinks = document.getElementById('update-links-checkbox').checked;
        await this.saveSettings();
        location.reload();
      });
    }

    create() {
      const button = this.createButton();
      const panel = this.createPanel();
      
      document.body.appendChild(button);
      document.body.appendChild(panel);
    
      this.attachEventListeners();
    }

    destroy() {
      if (this.settingsBtn) {
        this.settingsBtn.remove();
        this.settingsBtn = null;
      }
      if (this.settingsPanel) {
        this.settingsPanel.remove();
        this.settingsPanel = null;
      }
    }
  }

  window.SettingsUI = SettingsUI;
})();
