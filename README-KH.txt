កម្មវិធីបំបែកសំឡេង008 — Android APK Project v1.0

អ្វីដែលមានក្នុងកំណែនេះ៖
- រក្សា UI v1.0 ដដែល
- បើក UI ក្នុង Android WebView
- អាចជ្រើសរើសឯកសារសំឡេងពីទូរស័ព្ទ
- បង្កើត APK ដោយ GitHub Actions នៅលើ Cloud (មិនត្រូវការ Docker ឬ Android Studio នៅលើទូរស័ព្ទ)

របៀបបង្កើត APK៖
1. បង្កើត GitHub repository ថ្មីមួយ (ឧ. audio-separator-008-android)។
2. Upload ឯកសារ និង folder ទាំងអស់ក្នុង ZIP នេះទៅ repository នៅ branch main។
3. បើក tab Actions នៅក្នុង repository។
4. ជ្រើស workflow “Build Android APK” ហើយចុច Run workflow (ឬរង់ចាំ build ក្រោយ upload)។
5. ពេល workflow បង្ហាញពណ៌បៃតង សូមបើក run នោះ រកផ្នែក Artifacts ហើយទាញយក AudioSeparator008-debug-apk.zip។
6. Extract ZIP នោះ នឹងបាន app-debug.apk។ បើក APK លើទូរស័ព្ទ Android ដើម្បីដំឡើង។

ចំណាំសំខាន់៖
- កំណែនេះជាកញ្ចប់ Android សម្រាប់ UI ប៉ុណ្ណោះ។
- ប៊ូតុងដំណើរការនៅតែបង្ហាញ progress សាកល្បង។ វាមិនទាន់បំបែកសំឡេងពិតទេ។
- AI backend និងការទាញយកលទ្ធផលពិត នឹងភ្ជាប់នៅជំហានបន្ទាប់។
- APK នេះជា debug APK សម្រាប់សាកល្បង មិនមែន signed release APK សម្រាប់ Play Store ទេ។
