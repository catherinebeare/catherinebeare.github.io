document.addEventListener('DOMContentLoaded', function () {
    const toggleAccessibility = document.getElementById('toggle-accessibility');
    const accessibilityOptions = document.getElementById('accessibility-options');
    const colorTheme = document.getElementById('color-theme');
    const fontScale = document.getElementById('font-scale');

    toggleAccessibility.addEventListener('click', function () {
        accessibilityOptions.classList.toggle('d-none');
    });

    colorTheme.addEventListener('change', function () {
        document.body.className = '';
        if (this.value !== 'default') {
            document.body.classList.add(this.value);
        }
        localStorage.setItem('colorTheme', this.value);
    });

    fontScale.addEventListener('input', function () {
        document.documentElement.style.setProperty('--font-scale', this.value);
        localStorage.setItem('fontScale', this.value);
    });

    const savedColorTheme = localStorage.getItem('colorTheme');
    const savedFontScale = localStorage.getItem('fontScale');

    if (savedColorTheme) {
        colorTheme.value = savedColorTheme;
        document.body.className = '';
        if (savedColorTheme !== 'default') {
            document.body.classList.add(savedColorTheme);
        }
    }

    if (savedFontScale) {
        fontScale.value = savedFontScale;
        document.documentElement.style.setProperty('--font-scale', savedFontScale);
    }
});