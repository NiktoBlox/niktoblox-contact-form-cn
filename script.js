/**
 * NIKTOBLOX // GX CONTACT FORM PROTOCOL
 * Target Destination: boedblox1112@gmail.com
 * Theme: Opera GX Crimson & Dark Obsidian
 */

// ============================================================
// WEB AUDIO SYNTHESIZER (OPERA GX SOUND EMULATION)
// ============================================================
class GXSoundEngine {
  constructor() {
    this.audioCtx = null;
    this.enabled = localStorage.getItem('gx_audio_enabled') !== 'false';
  }

  init() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
      }
    }
  }

  playClick() {
    if (!this.enabled) return;
    this.init();
    if (!this.audioCtx) return;

    try {
      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.05);

      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.05);
    } catch (_) {}
  }

  playSuccess() {
    if (!this.enabled) return;
    this.init();
    if (!this.audioCtx) return;

    try {
      const now = this.audioCtx.currentTime;
      [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + i * 0.08);

        gain.gain.setValueAtTime(0.08, now + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.25);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start(now + i * 0.08);
        osc.stop(now + i * 0.08 + 0.25);
      });
    } catch (_) {}
  }

  playError() {
    if (!this.enabled) return;
    this.init();
    if (!this.audioCtx) return;

    try {
      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.linearRampToValueAtTime(140, now + 0.15);

      gain.gain.setValueAtTime(0.07, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.15);
    } catch (_) {}
  }

  toggle() {
    this.enabled = !this.enabled;
    localStorage.setItem('gx_audio_enabled', this.enabled);
    return this.enabled;
  }
}

const sfx = new GXSoundEngine();

// ============================================================
// DOM ELEMENTS & INITIALIZATION
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  const statusBanner = document.getElementById('status-banner');
  const bannerText = statusBanner.querySelector('.banner-text');
  const bannerClose = statusBanner.querySelector('.banner-close');
  const submitBtn = document.getElementById('submit-btn');
  const btnSpinner = submitBtn.querySelector('.btn-spinner');
  const btnIcon = submitBtn.querySelector('.btn-icon');
  const btnText = submitBtn.querySelector('.btn-text');
  
  // Audio Controls
  const audioBtn = document.getElementById('audio-toggle-btn');
  const audioOnIcon = audioBtn.querySelector('.audio-on-icon');
  const audioOffIcon = audioBtn.querySelector('.audio-off-icon');

  function updateAudioUI() {
    if (sfx.enabled) {
      audioOnIcon.style.display = 'inline-block';
      audioOffIcon.style.display = 'none';
      audioBtn.style.opacity = '1';
    } else {
      audioOnIcon.style.display = 'none';
      audioOffIcon.style.display = 'inline-block';
      audioBtn.style.opacity = '0.6';
    }
  }
  updateAudioUI();

  audioBtn.addEventListener('click', () => {
    const isNowOn = sfx.toggle();
    updateAudioUI();
    if (isNowOn) sfx.playClick();
  });

  // Dropdowns & Dynamic inputs
  const selectSource = document.getElementById('select-source');
  const dynamicSourceContainer = document.getElementById('dynamic-source-container');
  const inputSourceOther = document.getElementById('input-source-other');

  const selectType = document.getElementById('select-type');
  const dynamicTypeContainer = document.getElementById('dynamic-type-container');
  const inputTypeOther = document.getElementById('input-type-other');

  const textareaMessage = document.getElementById('textarea-message');
  const charCountSpan = document.getElementById('char-count');
  const currentYearSpan = document.getElementById('current-year');

  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // ============================================================
  // INTERACTIVE FEEDBACK (SFX ON CLICKS)
  // ============================================================
  document.querySelectorAll('input, select, textarea, button').forEach(el => {
    el.addEventListener('focus', () => sfx.playClick());
  });

  // ============================================================
  // DROPDOWN DYNAMIC INPUT REVEAL
  // ============================================================
  selectSource.addEventListener('change', () => {
    sfx.playClick();
    if (selectSource.value === '其他') {
      dynamicSourceContainer.style.display = 'block';
      inputSourceOther.focus();
    } else {
      dynamicSourceContainer.style.display = 'none';
      inputSourceOther.value = '';
      clearFieldError('source_other');
    }
    clearFieldError('source');
  });

  selectType.addEventListener('change', () => {
    sfx.playClick();
    if (selectType.value === '其他') {
      dynamicTypeContainer.style.display = 'block';
      inputTypeOther.focus();
    } else {
      dynamicTypeContainer.style.display = 'none';
      inputTypeOther.value = '';
      clearFieldError('contact_type_other');
    }
    clearFieldError('contact_type');
  });

  // ============================================================
  // CHARACTER COUNTER
  // ============================================================
  textareaMessage.addEventListener('input', () => {
    const len = textareaMessage.value.length;
    charCountSpan.textContent = len;
  });

  // ============================================================
  // FIELD VALIDATION HELPERS
  // ============================================================
  function setFieldError(fieldName, message) {
    const errorSpan = document.querySelector(`[data-error-for="${fieldName}"]`);
    const groupEl = document.getElementById(`group-${fieldName}`) || 
                    (fieldName.includes('_') ? document.getElementById(`group-${fieldName.split('_')[0]}`) : null);

    if (errorSpan) {
      errorSpan.textContent = message;
    }
    if (groupEl) {
      groupEl.classList.add('has-error');
    }
  }

  function clearFieldError(fieldName) {
    const errorSpan = document.querySelector(`[data-error-for="${fieldName}"]`);
    const groupEl = document.getElementById(`group-${fieldName}`) || 
                    (fieldName.includes('_') ? document.getElementById(`group-${fieldName.split('_')[0]}`) : null);

    if (errorSpan) {
      errorSpan.textContent = '';
    }
    if (groupEl) {
      groupEl.classList.remove('has-error');
    }
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function validateForm() {
    let isValid = true;

    // 1. 昵称
    const nameVal = form.name.value.trim();
    if (!nameVal) {
      setFieldError('name', '请填写您的昵称或名字');
      isValid = false;
    } else {
      clearFieldError('name');
    }

    // 2. 邮箱
    const emailVal = form.email.value.trim();
    if (!emailVal) {
      setFieldError('email', '请填写您的电子邮箱');
      isValid = false;
    } else if (!validateEmail(emailVal)) {
      setFieldError('email', '请输入有效的电子邮箱格式（例如 user@example.com）');
      isValid = false;
    } else {
      clearFieldError('email');
    }

    // 3. 来源渠道
    const sourceVal = selectSource.value;
    if (!sourceVal) {
      setFieldError('source', '请选择您是通过哪个平台找到我的');
      isValid = false;
    } else {
      clearFieldError('source');
      if (sourceVal === '其他' && !inputSourceOther.value.trim()) {
        setFieldError('source_other', '请补充说明具体来源平台');
        isValid = false;
      } else {
        clearFieldError('source_other');
      }
    }

    // 4. 联系类型
    const typeVal = selectType.value;
    if (!typeVal) {
      setFieldError('contact_type', '请选择联系类型');
      isValid = false;
    } else {
      clearFieldError('contact_type');
      if (typeVal === '其他' && !inputTypeOther.value.trim()) {
        setFieldError('contact_type_other', '请补充说明具体的联系类型或目的');
        isValid = false;
      } else {
        clearFieldError('contact_type_other');
      }
    }

    // 5. 消息内容
    const msgVal = form.message.value.trim();
    if (!msgVal) {
      setFieldError('message', '请填写您的留言消息内容');
      isValid = false;
    } else {
      clearFieldError('message');
    }

    return isValid;
  }

  // Clear errors on input
  ['name', 'email', 'source_other', 'contact_type_other', 'message'].forEach(field => {
    const el = form[field];
    if (el) {
      el.addEventListener('input', () => clearFieldError(field));
    }
  });

  // ============================================================
  // STATUS BANNER CONTROLS
  // ============================================================
  function showBanner(type, message) {
    statusBanner.className = `status-banner ${type}`;
    bannerText.textContent = message;
    statusBanner.style.display = 'flex';
    statusBanner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function hideBanner() {
    statusBanner.style.display = 'none';
  }

  bannerClose.addEventListener('click', () => {
    hideBanner();
  });

  // ============================================================
  // FORM SUBMISSION (SEND DIRECTLY TO boedblox1112@gmail.com)
  // ============================================================
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    hideBanner();

    if (!validateForm()) {
      sfx.playError();
      return;
    }

    // Loading State
    submitBtn.disabled = true;
    btnSpinner.style.display = 'inline-block';
    btnIcon.style.display = 'none';
    btnText.textContent = '传输中，请稍候...';

    // Format choices
    const finalSource = selectSource.value === '其他' 
      ? `其他 (补充: ${inputSourceOther.value.trim()})` 
      : selectSource.value;

    const finalType = selectType.value === '其他' 
      ? `其他 (补充: ${inputTypeOther.value.trim()})` 
      : selectType.value;

    const payload = {
      "昵称 (Nickname)": form.name.value.trim(),
      "电子邮箱 (Email)": form.email.value.trim(),
      "来源渠道 (Source)": finalSource,
      "联系类型 (Contact Type)": finalType,
      "留言消息 (Message)": form.message.value.trim(),
      _subject: `[GX联络终端] 收到来自「${form.name.value.trim()}」的新消息 (${finalType})`,
      _template: 'table',
      _captcha: 'false'
    };

    try {
      const response = await fetch('https://formsubmit.co/ajax/boedblox1112@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (response.ok && (result.success === 'true' || result.success === true || result.message)) {
        sfx.playSuccess();
        showBanner('success', '【传输成功】您的留言已成功送达目标邮箱！我们将尽快为您回复。');
        form.reset();
        charCountSpan.textContent = '0';
        dynamicSourceContainer.style.display = 'none';
        dynamicTypeContainer.style.display = 'none';
      } else {
        throw new Error(result.message || 'Transmission failed');
      }
    } catch (err) {
      console.warn('FormSubmit AJAX fallback error:', err);
      sfx.playError();
      showBanner('error', '【网络异常】消息发送受阻，请检查网络重试，或直接发信至 boedblox1112@gmail.com。');
    } finally {
      submitBtn.disabled = false;
      btnSpinner.style.display = 'none';
      btnIcon.style.display = 'inline-block';
      btnText.textContent = '发送联络消息';
    }
  });
});
