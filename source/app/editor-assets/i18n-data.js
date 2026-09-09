(function exposeIgnovaTranslations(root, factory) {
  const extra = typeof module === "object" && module.exports
    ? require("./i18n-extra.js")
    : root.PDF_IGNOVA_EXTRA_I18N;
  const data = factory(extra);
  if (typeof module === "object" && module.exports) module.exports = data;
  else root.PDF_IGNOVA_I18N_DATA = data;
})(typeof globalThis !== "undefined" ? globalThis : this, (extraTranslations) => {
  "use strict";

  const languages = Object.freeze({
    es: Object.freeze({ code: "es", html: "es", flag: "🇪🇸", icon: "./flags/es.svg", short: "ES", name: "Español" }),
    en: Object.freeze({ code: "en", html: "en", flag: "🇬🇧", icon: "./flags/en.svg", short: "EN", name: "English" }),
    pt: Object.freeze({ code: "pt", html: "pt-PT", flag: "🇵🇹", icon: "./flags/pt.svg", short: "PT", name: "Português" }),
    de: Object.freeze({ code: "de", html: "de", flag: "🇩🇪", icon: "./flags/de.svg", short: "DE", name: "Deutsch" }),
    fr: Object.freeze({ code: "fr", html: "fr", flag: "🇫🇷", icon: "./flags/fr.svg", short: "FR", name: "Français" }),
    zh: Object.freeze({ code: "zh", html: "zh-CN", flag: "🇨🇳", icon: "./flags/zh.svg", short: "中文", name: "简体中文" }),
    ms: Object.freeze({ code: "ms", html: "ms", flag: "🇲🇾", icon: "./flags/ms.svg", short: "MS", name: "Bahasa Melayu" }),
  });

  // Spanish source plus English, Portuguese, German, French, Simplified
  // Chinese and Malay. The last two columns are merged from the menu-focused
  // supplemental table so older translated messages retain a Spanish fallback.
  const rows = [
    ["Iniciando PDF Ignova Pro…", "Starting PDF Ignova Pro…", "A iniciar o PDF Ignova Pro…", "PDF Ignova Pro wird gestartet…", "Démarrage de PDF Ignova Pro…"],
    ["No se pudo iniciar la aplicación", "The application could not be started", "Não foi possível iniciar a aplicação", "Die Anwendung konnte nicht gestartet werden", "Impossible de démarrer l’application"],
    ["error desconocido", "unknown error", "erro desconhecido", "unbekannter Fehler", "erreur inconnue"],
    ["Menú principal", "Main menu", "Menu principal", "Hauptmenü", "Menu principal"],
    ["Abrir menú principal", "Open main menu", "Abrir o menu principal", "Hauptmenü öffnen", "Ouvrir le menu principal"],
    ["Nuevo documento", "New document", "Novo documento", "Neues Dokument", "Nouveau document"],
    ["Abrir / convertir", "Open / convert", "Abrir / converter", "Öffnen / konvertieren", "Ouvrir / convertir"],
    ["Abrir o convertir", "Open or convert", "Abrir ou converter", "Öffnen oder konvertieren", "Ouvrir ou convertir"],
    ["Procesamiento local", "Local processing", "Processamento local", "Lokale Verarbeitung", "Traitement local"],
    ["Programa de escritorio", "Desktop application", "Aplicação de ambiente de trabalho", "Desktop-Anwendung", "Application de bureau"],
    ["Atrás", "Back", "Voltar", "Zurück", "Retour"],
    ["Adelante", "Forward", "Avançar", "Vor", "Suivant"],
    ["Atrás: deshacer la última acción", "Back: undo the last action", "Voltar: desfazer a última ação", "Zurück: letzte Aktion rückgängig machen", "Retour : annuler la dernière action"],
    ["Adelante: rehacer la última acción", "Forward: redo the last action", "Avançar: refazer a última ação", "Vor: letzte Aktion wiederholen", "Suivant : rétablir la dernière action"],
    ["Navegación de páginas", "Page navigation", "Navegação de páginas", "Seitennavigation", "Navigation des pages"],
    ["Archivo", "File", "Ficheiro", "Datei", "Fichier"],
    ["Inicio", "Home", "Início", "Start", "Accueil"],
    ["Guardar", "Save", "Guardar", "Speichern", "Enregistrer"],
    ["Guardar como", "Save as", "Guardar como", "Speichern unter", "Enregistrer sous"],
    ["Imprimir", "Print", "Imprimir", "Drucken", "Imprimer"],
    ["Marca de agua", "Watermark", "Marca de água", "Wasserzeichen", "Filigrane"],
    ["Editar", "Edit", "Editar", "Bearbeiten", "Modifier"],
    ["Deshacer", "Undo", "Desfazer", "Rückgängig", "Annuler"],
    ["Rehacer", "Redo", "Refazer", "Wiederholen", "Rétablir"],
    ["Añadir y editar texto", "Add and edit text", "Adicionar e editar texto", "Text hinzufügen und bearbeiten", "Ajouter et modifier du texte"],
    ["Escribir a mano alzada", "Write freehand", "Escrever à mão livre", "Freihand schreiben", "Écrire à main levée"],
    ["Insertar imagen", "Insert image", "Inserir imagem", "Bild einfügen", "Insérer une image"],
    ["Pegar imagen", "Paste image", "Colar imagem", "Bild einfügen", "Coller une image"],
    ["Páginas", "Pages", "Páginas", "Seiten", "Pages"],
    ["Agregar o unir documentos", "Add or merge documents", "Adicionar ou unir documentos", "Dokumente hinzufügen oder zusammenführen", "Ajouter ou fusionner des documents"],
    ["Mostrar panel de páginas", "Show page panel", "Mostrar painel de páginas", "Seitenbereich anzeigen", "Afficher le volet des pages"],
    ["Duplicar seleccionadas", "Duplicate selected pages", "Duplicar páginas selecionadas", "Ausgewählte Seiten duplizieren", "Dupliquer les pages sélectionnées"],
    ["Girar a la izquierda", "Rotate left", "Rodar para a esquerda", "Nach links drehen", "Pivoter à gauche"],
    ["Girar a la derecha", "Rotate right", "Rodar para a direita", "Nach rechts drehen", "Pivoter à droite"],
    ["Eliminar páginas", "Delete pages", "Eliminar páginas", "Seiten löschen", "Supprimer les pages"],
    ["Copiar a", "Copy to", "Copiar para", "Kopieren nach", "Copier vers"],
    ["Mover a", "Move to", "Mover para", "Verschieben nach", "Déplacer vers"],
    ["Visualización", "View", "Visualização", "Ansicht", "Affichage"],
    ["Escala real", "Actual size", "Tamanho real", "Originalgröße", "Taille réelle"],
    ["Extensión / página completa", "Fit / full page", "Extensão / página completa", "Einpassen / ganze Seite", "Ajuster / page entière"],
    ["Ajustar al ancho", "Fit to width", "Ajustar à largura", "An Breite anpassen", "Ajuster à la largeur"],
    ["Herramienta Mano", "Hand tool", "Ferramenta Mão", "Hand-Werkzeug", "Outil Main"],
    ["Panel de páginas", "Page panel", "Painel de páginas", "Seitenbereich", "Volet des pages"],
    ["Panel de propiedades", "Properties panel", "Painel de propriedades", "Eigenschaftenbereich", "Volet des propriétés"],
    ["Pantalla completa", "Full screen", "Ecrã inteiro", "Vollbild", "Plein écran"],
    ["Buscar en todo el documento", "Search the entire document", "Pesquisar em todo o documento", "Gesamtes Dokument durchsuchen", "Rechercher dans tout le document"],
    ["Buscar en todas las páginas", "Search all pages", "Pesquisar em todas as páginas", "Alle Seiten durchsuchen", "Rechercher dans toutes les pages"],
    ["Busca el texto en todas las páginas del documento", "Search for text on every page of the document", "Pesquisar texto em todas as páginas do documento", "Text auf allen Seiten des Dokuments suchen", "Rechercher du texte dans toutes les pages du document"],
    ["Coincidencia anterior", "Previous match", "Ocorrência anterior", "Vorheriger Treffer", "Occurrence précédente"],
    ["Coincidencia siguiente", "Next match", "Ocorrência seguinte", "Nächster Treffer", "Occurrence suivante"],
    ["Coincidencia anterior (Mayús+Enter)", "Previous match (Shift+Enter)", "Ocorrência anterior (Shift+Enter)", "Vorheriger Treffer (Umschalt+Eingabe)", "Occurrence précédente (Maj+Entrée)"],
    ["Coincidencia siguiente (Enter)", "Next match (Enter)", "Ocorrência seguinte (Enter)", "Nächster Treffer (Eingabe)", "Occurrence suivante (Entrée)"],
    ["Exportar", "Export", "Exportar", "Exportieren", "Exporter"],
    ["Word con OCR", "Word with OCR", "Word com OCR", "Word mit OCR", "Word avec OCR"],
    ["Excel con OCR", "Excel with OCR", "Excel com OCR", "Excel mit OCR", "Excel avec OCR"],
    ["Firma digital", "Digital signature", "Assinatura digital", "Digitale Signatur", "Signature numérique"],
    ["Herramientas", "Tools", "Ferramentas", "Werkzeuge", "Outils"],
    ["Añadir", "Add", "Adicionar", "Hinzufügen", "Ajouter"],
    ["Copiar", "Copy", "Copiar", "Kopieren", "Copier"],
    ["Borrar", "Delete", "Eliminar", "Löschen", "Supprimer"],
    ["Organizar páginas", "Organise pages", "Organizar páginas", "Seiten organisieren", "Organiser les pages"],
    ["Añadir páginas", "Add pages", "Adicionar páginas", "Seiten hinzufügen", "Ajouter des pages"],
    ["Mover, copiar, girar o borrar", "Move, copy, rotate or delete", "Mover, copiar, rodar ou eliminar", "Verschieben, kopieren, drehen oder löschen", "Déplacer, copier, pivoter ou supprimer"],
    ["Editar un PDF", "Edit a PDF", "Editar um PDF", "PDF bearbeiten", "Modifier un PDF"],
    ["Mano alzada", "Freehand", "Mão livre", "Freihand", "Main levée"],
    ["Escribir o dibujar con el ratón", "Write or draw with the mouse", "Escrever ou desenhar com o rato", "Mit der Maus schreiben oder zeichnen", "Écrire ou dessiner à la souris"],
    ["Foto, captura o logotipo", "Photo, screenshot or logo", "Fotografia, captura ou logótipo", "Foto, Screenshot oder Logo", "Photo, capture ou logo"],
    ["Haz clic en el punto de destino", "Click the destination point", "Clique no ponto de destino", "Auf den Zielpunkt klicken", "Cliquez sur le point de destination"],
    ["Mano", "Hand", "Mão", "Hand", "Main"],
    ["Seleccionar", "Select", "Selecionar", "Auswählen", "Sélectionner"],
    ["Extensión", "Fit", "Extensão", "Einpassen", "Ajuster"],
    ["Zoom extensión", "Fit zoom", "Zoom de extensão", "Zoom einpassen", "Zoom ajusté"],
    ["Texto", "Text", "Texto", "Text", "Texte"],
    ["Resaltar", "Highlight", "Realçar", "Hervorheben", "Surligner"],
    ["Tapado negro", "Black redaction", "Ocultação preta", "Schwärzung", "Masquage noir"],
    ["Tapado blanco", "White cover", "Ocultação branca", "Weiße Abdeckung", "Masquage blanc"],
    ["Imagen", "Image", "Imagem", "Bild", "Image"],
    ["Pegar", "Paste", "Colar", "Einfügen", "Coller"],
    ["Propiedades", "Properties", "Propriedades", "Eigenschaften", "Propriétés"],
    ["Girar página a la izquierda", "Rotate page left", "Rodar página para a esquerda", "Seite nach links drehen", "Pivoter la page à gauche"],
    ["Girar página a la derecha", "Rotate page right", "Rodar página para a direita", "Seite nach rechts drehen", "Pivoter la page à droite"],
    ["Color", "Colour", "Cor", "Farbe", "Couleur"],
    ["Ancho del trazo", "Stroke width", "Largura do traço", "Strichbreite", "Épaisseur du trait"],
    ["Transparencia del resaltado", "Highlight transparency", "Transparência do realce", "Transparenz der Hervorhebung", "Transparence du surlignage"],
    ["Color del resaltado", "Highlight colour", "Cor do realce", "Farbe der Hervorhebung", "Couleur du surlignage"],
    ["Color del tapado", "Redaction colour", "Cor da ocultação", "Farbe der Schwärzung", "Couleur du masquage"],
    ["EDITOR PDF PROFESIONAL", "PROFESSIONAL PDF EDITOR", "EDITOR PROFISSIONAL DE PDF", "PROFESSIONELLER PDF-EDITOR", "ÉDITEUR PDF PROFESSIONNEL"],
    ["Abre un PDF y trabaja con sus páginas", "Open a PDF and work with its pages", "Abra um PDF e trabalhe com as suas páginas", "PDF öffnen und Seiten bearbeiten", "Ouvrez un PDF et travaillez sur ses pages"],
    ["Organiza, edita, tapa, inserta imágenes, firma y exporta desde una aplicación de escritorio.", "Organise, edit, redact, insert images, sign and export from a desktop application.", "Organize, edite, oculte, insira imagens, assine e exporte numa aplicação de ambiente de trabalho.", "Seiten organisieren, bearbeiten, schwärzen, Bilder einfügen, signieren und exportieren.", "Organisez, modifiez, masquez, insérez des images, signez et exportez depuis une application de bureau."],
    ["Arrastra aquí PDF, Word, Excel, PowerPoint, DWG o imágenes", "Drag PDF, Word, Excel, PowerPoint, DWG files or images here", "Arraste para aqui PDF, Word, Excel, PowerPoint, DWG ou imagens", "PDF-, Word-, Excel-, PowerPoint-, DWG-Dateien oder Bilder hierher ziehen", "Glissez ici des PDF, fichiers Word, Excel, PowerPoint, DWG ou des images"],
    ["Sin documento", "No document", "Sem documento", "Kein Dokument", "Aucun document"],
    ["Página", "Page", "Página", "Seite", "Page"],
    ["de", "of", "de", "von", "sur"],
    ["Página activa", "Active page", "Página ativa", "Aktive Seite", "Page active"],
    ["Acciones de página", "Page actions", "Ações da página", "Seitenaktionen", "Actions de page"],
    ["Izquierda", "Left", "Esquerda", "Links", "Gauche"],
    ["Derecha", "Right", "Direita", "Rechts", "Droite"],
    ["Duplicar", "Duplicate", "Duplicar", "Duplizieren", "Dupliquer"],
    ["Eliminar", "Delete", "Eliminar", "Löschen", "Supprimer"],
    ["Exportar documento", "Export document", "Exportar documento", "Dokument exportieren", "Exporter le document"],
    ["Documento PDF", "PDF document", "Documento PDF", "PDF-Dokument", "Document PDF"],
    ["Conservar diseño, imágenes y páginas", "Preserve layout, images and pages", "Manter o esquema, as imagens e as páginas", "Layout, Bilder und Seiten beibehalten", "Conserver la mise en page, les images et les pages"],
    ["OCR, texto editable y estructura original", "OCR, editable text and original structure", "OCR, texto editável e estrutura original", "OCR, bearbeitbarer Text und Originalstruktur", "OCR, texte modifiable et structure d’origine"],
    ["OCR y reconstrucción de tablas", "OCR and table reconstruction", "OCR e reconstrução de tabelas", "OCR und Tabellenrekonstruktion", "OCR et reconstruction des tableaux"],
    ["Tus documentos se procesan en este dispositivo y no se guardan en un servidor.", "Your documents are processed on this device and are not stored on a server.", "Os seus documentos são processados neste dispositivo e não são guardados num servidor.", "Ihre Dokumente werden auf diesem Gerät verarbeitet und nicht auf einem Server gespeichert.", "Vos documents sont traités sur cet appareil et ne sont pas stockés sur un serveur."],
    ["Editar texto", "Edit text", "Editar texto", "Text bearbeiten", "Modifier le texte"],
    ["Editar imagen", "Edit image", "Editar imagem", "Bild bearbeiten", "Modifier l’image"],
    ["Dibujo a mano alzada", "Freehand drawing", "Desenho à mão livre", "Freihandzeichnung", "Dessin à main levée"],
    ["Editar marca", "Edit mark", "Editar marca", "Markierung bearbeiten", "Modifier l’annotation"],
    ["Tipo de letra", "Font", "Tipo de letra", "Schriftart", "Police"],
    ["Tamaño", "Size", "Tamanho", "Größe", "Taille"],
    ["Negrita", "Bold", "Negrito", "Fett", "Gras"],
    ["Cursiva", "Italic", "Itálico", "Kursiv", "Italique"],
    ["Subrayado", "Underline", "Sublinhado", "Unterstrichen", "Souligné"],
    ["Se conserva la fuente detectada del texto sustituido. Solo cambiará si eliges otra.", "The detected font of the replaced text is preserved. It changes only if you choose another one.", "O tipo de letra detetado no texto substituído é mantido. Só muda se escolher outro.", "Die erkannte Schriftart des ersetzten Textes bleibt erhalten. Sie ändert sich nur, wenn Sie eine andere wählen.", "La police détectée du texte remplacé est conservée. Elle ne change que si vous en choisissez une autre."],
    ["Cambiar imagen", "Change image", "Alterar imagem", "Bild ändern", "Changer l’image"],
    ["Restablecer recorte", "Reset crop", "Repor recorte", "Zuschnitt zurücksetzen", "Réinitialiser le recadrage"],
    ["Recortar izquierda:", "Crop left:", "Recortar à esquerda:", "Links zuschneiden:", "Recadrer à gauche :"],
    ["Recortar derecha:", "Crop right:", "Recortar à direita:", "Rechts zuschneiden:", "Recadrer à droite :"],
    ["Recortar arriba:", "Crop top:", "Recortar em cima:", "Oben zuschneiden:", "Recadrer en haut :"],
    ["Recortar abajo:", "Crop bottom:", "Recortar em baixo:", "Unten zuschneiden:", "Recadrer en bas :"],
    ["Arrastra la imagen para moverla. Usa el cuadrado azul de la esquina para ampliar o reducir.", "Drag the image to move it. Use the blue corner square to resize it.", "Arraste a imagem para a mover. Utilize o quadrado azul no canto para alterar o tamanho.", "Ziehen Sie das Bild, um es zu verschieben. Mit dem blauen Quadrat in der Ecke ändern Sie die Größe.", "Faites glisser l’image pour la déplacer. Utilisez le carré bleu dans l’angle pour la redimensionner."],
    ["Color del trazo", "Stroke colour", "Cor do traço", "Strichfarbe", "Couleur du trait"],
    ["Ancho:", "Width:", "Largura:", "Breite:", "Largeur :"],
    ["Pulsa el botón derecho sobre el trazo para dejar de seleccionarlo.", "Right-click the stroke to deselect it.", "Clique com o botão direito no traço para deixar de o selecionar.", "Klicken Sie mit der rechten Maustaste auf den Strich, um die Auswahl aufzuheben.", "Faites un clic droit sur le trait pour le désélectionner."],
    ["Color de la marca", "Mark colour", "Cor da marca", "Markierungsfarbe", "Couleur de l’annotation"],
    ["Elegir cualquier color", "Choose any colour", "Escolher qualquer cor", "Beliebige Farbe wählen", "Choisir une couleur"],
    ["Opacidad:", "Opacity:", "Opacidade:", "Deckkraft:", "Opacité :"],
    ["El resaltado permanece transparente para que el texto inferior siga siendo legible.", "The highlight remains transparent so the text underneath stays readable.", "O realce permanece transparente para que o texto por baixo continue legível.", "Die Hervorhebung bleibt transparent, damit der Text darunter lesbar ist.", "Le surlignage reste transparent afin que le texte en dessous demeure lisible."],
    ["Tapado blanco sin borde. Arrástralo y utiliza el cuadrado azul para cambiar su tamaño.", "Borderless white cover. Drag it and use the blue square to resize it.", "Ocultação branca sem contorno. Arraste-a e utilize o quadrado azul para alterar o tamanho.", "Weiße Abdeckung ohne Rand. Ziehen Sie sie und ändern Sie die Größe mit dem blauen Quadrat.", "Masquage blanc sans bordure. Faites-le glisser et utilisez le carré bleu pour le redimensionner."],
    ["Copiar elemento", "Copy element", "Copiar elemento", "Element kopieren", "Copier l’élément"],
    ["Cortar elemento", "Cut element", "Cortar elemento", "Element ausschneiden", "Couper l’élément"],
    ["Eliminar elemento", "Delete element", "Eliminar elemento", "Element löschen", "Supprimer l’élément"],
    ["Pegar imagen aquí", "Paste image here", "Colar imagem aqui", "Bild hier einfügen", "Coller l’image ici"],
    ["Insertar imagen aquí", "Insert image here", "Inserir imagem aqui", "Bild hier einfügen", "Insérer l’image ici"],
    ["Copiar/duplicar página", "Copy/duplicate page", "Copiar/duplicar página", "Seite kopieren/duplizieren", "Copier/dupliquer la page"],
    ["Girar página", "Rotate page", "Rodar página", "Seite drehen", "Pivoter la page"],
    ["Insertar documento", "Insert document", "Inserir documento", "Dokument einfügen", "Insérer un document"],
    ["Eliminar página", "Delete page", "Eliminar página", "Seite löschen", "Supprimer la page"],
    ["Nombre del archivo", "File name", "Nome do ficheiro", "Dateiname", "Nom du fichier"],
    ["Cancelar", "Cancel", "Cancelar", "Abbrechen", "Annuler"],
    ["Cerrar", "Close", "Fechar", "Schließen", "Fermer"],
    ["Firma digital con certificado", "Digital signature with certificate", "Assinatura digital com certificado", "Digitale Signatur mit Zertifikat", "Signature numérique avec certificat"],
    ["Certificado digital", "Digital certificate", "Certificado digital", "Digitales Zertifikat", "Certificat numérique"],
    ["Seleccionar certificado .P12 o .PFX", "Select .P12 or .PFX certificate", "Selecionar certificado .P12 ou .PFX", ".P12- oder .PFX-Zertifikat auswählen", "Sélectionner un certificat .P12 ou .PFX"],
    ["Contraseña del certificado", "Certificate password", "Palavra-passe do certificado", "Zertifikatspasswort", "Mot de passe du certificat"],
    ["Contraseña", "Password", "Palavra-passe", "Passwort", "Mot de passe"],
    ["Nombre del firmante", "Signer name", "Nome do signatário", "Name der signierenden Person", "Nom du signataire"],
    ["Nombre y apellidos", "Full name", "Nome completo", "Vor- und Nachname", "Nom et prénom"],
    ["Motivo", "Reason", "Motivo", "Grund", "Motif"],
    ["Aprobación del documento", "Document approval", "Aprovação do documento", "Dokumentfreigabe", "Approbation du document"],
    ["Ubicación", "Location", "Localização", "Ort", "Lieu"],
    ["Contacto", "Contact", "Contacto", "Kontakt", "Contact"],
    ["Opcional", "Optional", "Opcional", "Optional", "Facultatif"],
    ["Añadir sello visible en la página activa", "Add a visible stamp to the active page", "Adicionar selo visível à página ativa", "Sichtbaren Stempel auf der aktiven Seite hinzufügen", "Ajouter un cachet visible sur la page active"],
    ["Firmar y descargar PDF", "Sign and download PDF", "Assinar e transferir o PDF", "PDF signieren und herunterladen", "Signer et télécharger le PDF"],
    ["El certificado y su contraseña se usan únicamente en este equipo y no se envían a Internet.", "The certificate and its password are used only on this device and are not sent over the Internet.", "O certificado e a palavra-passe são utilizados apenas neste dispositivo e não são enviados pela Internet.", "Zertifikat und Passwort werden nur auf diesem Gerät verwendet und nicht über das Internet übertragen.", "Le certificat et son mot de passe sont utilisés uniquement sur cet appareil et ne sont pas envoyés sur Internet."],
    ["Páginas para imprimir", "Pages to print", "Páginas a imprimir", "Zu druckende Seiten", "Pages à imprimer"],
    ["Páginas para exportar", "Pages to export", "Páginas a exportar", "Zu exportierende Seiten", "Pages à exporter"],
    ["Páginas para exportar a Word", "Pages to export to Word", "Páginas a exportar para Word", "Nach Word zu exportierende Seiten", "Pages à exporter vers Word"],
    ["Páginas para exportar a Excel", "Pages to export to Excel", "Páginas a exportar para Excel", "Nach Excel zu exportierende Seiten", "Pages à exporter vers Excel"],
    ["Exportar Word", "Export Word", "Exportar Word", "Word exportieren", "Exporter vers Word"],
    ["Exportar Excel", "Export Excel", "Exportar Excel", "Excel exportieren", "Exporter vers Excel"],
    ["Todas", "All", "Todas", "Alle", "Toutes"],
    ["Actual", "Current", "Atual", "Aktuell", "Actuelle"],
    ["Seleccionadas", "Selected", "Selecionadas", "Ausgewählt", "Sélectionnées"],
    ["Páginas concretas", "Specific pages", "Páginas específicas", "Bestimmte Seiten", "Pages précises"],
    ["Selecciona todas, la actual, las marcadas en el panel o escribe páginas sueltas y rangos.", "Select all pages, the current page, those marked in the panel, or enter individual pages and ranges.", "Selecione todas, a atual, as assinaladas no painel ou introduza páginas individuais e intervalos.", "Wählen Sie alle, die aktuelle oder im Bereich markierte Seiten aus, oder geben Sie einzelne Seiten und Bereiche ein.", "Sélectionnez toutes les pages, la page actuelle, celles marquées dans le volet, ou saisissez des pages et des plages."],
    ["Separa páginas con comas y usa un guión para los rangos.", "Separate pages with commas and use a hyphen for ranges.", "Separe as páginas por vírgulas e utilize um hífen para os intervalos.", "Trennen Sie Seiten durch Kommas und verwenden Sie einen Bindestrich für Bereiche.", "Séparez les pages par des virgules et utilisez un tiret pour les plages."],
    ["Indica al menos una página", "Enter at least one page", "Indique pelo menos uma página", "Geben Sie mindestens eine Seite an", "Indiquez au moins une page"],
    ["Ej.: 1, 3, 5-8", "e.g. 1, 3, 5-8", "Ex.: 1, 3, 5-8", "z. B. 1, 3, 5-8", "Ex. : 1, 3, 5-8"],
    ["o", "or", "ou", "oder", "ou"],
    ["error de OCR", "OCR error", "erro de OCR", "OCR-Fehler", "erreur d’OCR"],
    ["Continuar", "Continue", "Continuar", "Weiter", "Continuer"],
    ["Personalizar barra de herramientas", "Customise toolbar", "Personalizar barra de ferramentas", "Symbolleiste anpassen", "Personnaliser la barre d’outils"],
    ["Personalizar barra", "Customise toolbar", "Personalizar barra", "Symbolleiste anpassen", "Personnaliser la barre"],
    ["Arrastra los iconos en la barra para moverlos", "Drag icons on the toolbar to move them", "Arraste os ícones na barra para os mover", "Ziehen Sie Symbole in der Leiste, um sie zu verschieben", "Faites glisser les icônes dans la barre pour les déplacer"],
    ["Quitar de la barra", "Remove from toolbar", "Remover da barra", "Aus Symbolleiste entfernen", "Retirer de la barre"],
    ["Añadir a la barra", "Add to toolbar", "Adicionar à barra", "Zur Symbolleiste hinzufügen", "Ajouter à la barre"],
    ["Mover a la izquierda", "Move left", "Mover para a esquerda", "Nach links verschieben", "Déplacer vers la gauche"],
    ["Mover a la derecha", "Move right", "Mover para a direita", "Nach rechts verschieben", "Déplacer vers la droite"],
    ["Restaurar barra original", "Restore default toolbar", "Repor barra original", "Standard-Symbolleiste wiederherstellen", "Restaurer la barre d’origine"],
    ["Abrir un documento", "Open a document", "Abrir um documento", "Dokument öffnen", "Ouvrir un document"],
    ["Combinar archivos", "Merge files", "Combinar ficheiros", "Dateien zusammenführen", "Fusionner des fichiers"],
    ["Ampliar o reducir", "Enlarge or reduce", "Aumentar ou reduzir", "Vergrößern oder verkleinern", "Agrandir ou réduire"],
    ["Ancho", "Width", "Largura", "Breite", "Largeur"],
    ["Opacidad", "Opacity", "Opacidade", "Deckkraft", "Opacité"],
    ["Mover", "Move", "Mover", "Verschieben", "Déplacer"],
    ["Mover texto", "Move text", "Mover texto", "Text verschieben", "Déplacer le texte"],
    ["seleccionadas", "selected", "selecionadas", "ausgewählt", "sélectionnées"],
    ["PDF, Office, DWG, JPG, PNG o TIF", "PDF, Office, DWG, JPG, PNG or TIF", "PDF, Office, DWG, JPG, PNG ou TIF", "PDF, Office, DWG, JPG, PNG oder TIF", "PDF, Office, DWG, JPG, PNG ou TIF"],
    ["Abre un PDF antes de insertar una imagen", "Open a PDF before inserting an image", "Abra um PDF antes de inserir uma imagem", "Öffnen Sie vor dem Einfügen eines Bildes eine PDF-Datei", "Ouvrez un PDF avant d’insérer une image"],
    ["Abriendo documento del sistema…", "Opening system document…", "A abrir o documento do sistema…", "Systemdokument wird geöffnet…", "Ouverture du document système…"],
    ["Abriendo o convirtiendo documentos…", "Opening or converting documents…", "A abrir ou converter documentos…", "Dokumente werden geöffnet oder konvertiert…", "Ouverture ou conversion des documents…"],
    ["Creando PDF…", "Creating PDF…", "A criar o PDF…", "PDF wird erstellt…", "Création du PDF…"],
    ["Documento cerrado", "Document closed", "Documento fechado", "Dokument geschlossen", "Document fermé"],
    ["Elemento copiado", "Element copied", "Elemento copiado", "Element kopiert", "Élément copié"],
    ["Elemento eliminado", "Element deleted", "Elemento eliminado", "Element gelöscht", "Élément supprimé"],
    ["Elemento pegado", "Element pasted", "Elemento colado", "Element eingefügt", "Élément collé"],
    ["Exportando a Excel…", "Exporting to Excel…", "A exportar para Excel…", "Export nach Excel…", "Exportation vers Excel…"],
    ["Exportando a Word…", "Exporting to Word…", "A exportar para Word…", "Export nach Word…", "Exportation vers Word…"],
    ["Excel exportado", "Excel exported", "Excel exportado", "Excel-Datei exportiert", "Fichier Excel exporté"],
    ["Excel exportado con OCR y columnas reconstruidas", "Excel exported with OCR and reconstructed columns", "Excel exportado com OCR e colunas reconstruídas", "Excel-Datei mit OCR und rekonstruierten Spalten exportiert", "Fichier Excel exporté avec OCR et colonnes reconstruites"],
    ["FIRMADO DIGITALMENTE", "DIGITALLY SIGNED", "ASSINADO DIGITALMENTE", "DIGITAL SIGNIERT", "SIGNÉ NUMÉRIQUEMENT"],
    ["Firmando PDF con certificado…", "Signing PDF with certificate…", "A assinar o PDF com certificado…", "PDF wird mit Zertifikat signiert…", "Signature du PDF avec le certificat…"],
    ["Imagen insertada: puedes moverla, ampliarla y recortarla", "Image inserted: you can move, resize and crop it", "Imagem inserida: pode movê-la, redimensioná-la e recortá-la", "Bild eingefügt: Sie können es verschieben, skalieren und zuschneiden", "Image insérée : vous pouvez la déplacer, la redimensionner et la recadrer"],
    ["Imagen sustituida", "Image replaced", "Imagem substituída", "Bild ersetzt", "Image remplacée"],
    ["Leyendo documentos…", "Reading documents…", "A ler os documentos…", "Dokumente werden gelesen…", "Lecture des documents…"],
    ["No hay una imagen en el portapapeles. Copia una imagen y vuelve a intentarlo", "There is no image on the clipboard. Copy an image and try again", "Não existe nenhuma imagem na área de transferência. Copie uma imagem e tente novamente", "Die Zwischenablage enthält kein Bild. Kopieren Sie ein Bild und versuchen Sie es erneut", "Le presse-papiers ne contient aucune image. Copiez une image et réessayez"],
    ["No se pudieron convertir los documentos", "The documents could not be converted", "Não foi possível converter os documentos", "Die Dokumente konnten nicht konvertiert werden", "Impossible de convertir les documents"],
    ["No se pudo abrir el archivo solicitado por el sistema", "The file requested by the system could not be opened", "Não foi possível abrir o ficheiro solicitado pelo sistema", "Die vom System angeforderte Datei konnte nicht geöffnet werden", "Impossible d’ouvrir le fichier demandé par le système"],
    ["No se pudo generar el PDF", "The PDF could not be generated", "Não foi possível gerar o PDF", "Die PDF-Datei konnte nicht erstellt werden", "Impossible de générer le PDF"],
    ["No se pudo incrustar la fuente del sistema", "The system font could not be embedded", "Não foi possível incorporar o tipo de letra do sistema", "Die Systemschriftart konnte nicht eingebettet werden", "Impossible d’incorporer la police du système"],
    ["No se pudo leer la imagen", "The image could not be read", "Não foi possível ler a imagem", "Das Bild konnte nicht gelesen werden", "Impossible de lire l’image"],
    ["No se pudo recortar", "Cropping failed", "Não foi possível recortar", "Zuschneiden fehlgeschlagen", "Échec du recadrage"],
    ["PDF firmado digitalmente y guardado", "PDF digitally signed and saved", "PDF assinado digitalmente e guardado", "PDF digital signiert und gespeichert", "PDF signé numériquement et enregistré"],
    ["PDF guardado", "PDF saved", "PDF guardado", "PDF gespeichert", "PDF enregistré"],
    ["Preparando el cuadro de impresoras del sistema", "Preparing the system printer dialogue", "A preparar a janela de impressoras do sistema", "Systemdruckdialog wird vorbereitet", "Préparation de la boîte de dialogue d’impression du système"],
    ["Se abrió el visor del sistema para imprimir", "The system viewer was opened for printing", "O visualizador do sistema foi aberto para imprimir", "Die Systemanzeige wurde zum Drucken geöffnet", "La visionneuse du système a été ouverte pour l’impression"],
    ["Selecciona un archivo compatible", "Select a compatible file", "Selecione um ficheiro compatível", "Wählen Sie eine kompatible Datei", "Sélectionnez un fichier compatible"],
    ["Texto copiado al portapapeles", "Text copied to the clipboard", "Texto copiado para a área de transferência", "Text in die Zwischenablage kopiert", "Texte copié dans le presse-papiers"],
    ["Texto del PDF listo para editar", "PDF text ready to edit", "Texto do PDF pronto a editar", "PDF-Text kann bearbeitet werden", "Texte du PDF prêt à être modifié"],
    ["Word exportado conservando la estructura", "Word exported while preserving the structure", "Word exportado mantendo a estrutura", "Word-Datei unter Beibehaltung der Struktur exportiert", "Fichier Word exporté en conservant la structure"],
    ["Texto de la marca de agua", "Watermark text", "Texto da marca de água", "Wasserzeichentext", "Texte du filigrane"],
    ["BORRADOR", "DRAFT", "RASCUNHO", "ENTWURF", "BROUILLON"],
    ["Opacidad (5 a 80 %)", "Opacity (5 to 80%)", "Opacidade (5 a 80%)", "Deckkraft (5 bis 80 %)", "Opacité (5 à 80 %)"],
    ["Inclinación en grados", "Angle in degrees", "Inclinação em graus", "Neigung in Grad", "Inclinaison en degrés"],
    ["Aceptar: todas las páginas. Cancelar: solo la página actual.", "OK: all pages. Cancel: current page only.", "Aceitar: todas as páginas. Cancelar: apenas a página atual.", "OK: alle Seiten. Abbrechen: nur die aktuelle Seite.", "OK : toutes les pages. Annuler : uniquement la page actuelle."],
  ];

  const extraRows = Array.isArray(extraTranslations?.rows) ? extraTranslations.rows : [];
  const completeRows = Array.isArray(extraTranslations?.completeRows)
    ? extraTranslations.completeRows
    : [];
  const extraBySource = new Map(extraRows.map((row) => [row[0], row]));
  const completeBySource = new Map(completeRows.map((row) => [row[0], row]));
  const sourceKeys = new Set(rows.map((row) => row[0]));
  for (const row of rows) {
    const extra = extraBySource.get(row[0]);
    const complete = completeBySource.get(row[0]);
    row.push(
      complete?.[1] || extra?.[5] || row[0],
      complete?.[2] || extra?.[6] || row[0],
    );
  }
  for (const extra of extraRows) {
    if (!sourceKeys.has(extra[0])) {
      rows.push([...extra]);
      sourceKeys.add(extra[0]);
    }
  }

  const codes = ["es", "en", "pt", "de", "fr", "zh", "ms"];
  const dictionaries = Object.fromEntries(codes.map((code) => [code, Object.create(null)]));
  for (const row of rows) {
    if (row.length !== codes.length) throw new Error(`Invalid translation row: ${row[0]}`);
    for (let index = 0; index < codes.length; index += 1) {
      dictionaries[codes[index]][row[0]] = row[index];
    }
  }

  const aliases = Object.freeze({
    es: "es", spa: "es",
    en: "en", eng: "en",
    pt: "pt", por: "pt",
    de: "de", deu: "de", ger: "de",
    fr: "fr", fra: "fr", fre: "fr",
    zh: "zh", "zh-cn": "zh", "zh-hans": "zh", zho: "zh", chi: "zh",
    ms: "ms", msa: "ms", may: "ms",
  });

  function normalizeLanguage(value) {
    const raw = String(value || "").trim().toLowerCase();
    const base = raw.split(/[-_]/)[0];
    return aliases[raw] || aliases[base] || "es";
  }

  const dynamicTemplates = Object.freeze({
    en: Object.freeze({ page: "Page $1", pages: "$1 pages", marked: "$1 marked", selected: "$1 selected", matches: "$1 matches", files: "$1 files", of: "$1 of $2", useColour: "Use colour $1", removeTool: "Remove ‘$1’ from the toolbar" }),
    pt: Object.freeze({ page: "Página $1", pages: "$1 páginas", marked: "$1 assinaladas", selected: "$1 selecionadas", matches: "$1 ocorrências", files: "$1 ficheiros", of: "$1 de $2", useColour: "Usar cor $1", removeTool: "Remover «$1» da barra" }),
    de: Object.freeze({ page: "Seite $1", pages: "$1 Seiten", marked: "$1 markiert", selected: "$1 ausgewählt", matches: "$1 Treffer", files: "$1 Dateien", of: "$1 von $2", useColour: "Farbe $1 verwenden", removeTool: "„$1“ aus der Symbolleiste entfernen" }),
    fr: Object.freeze({ page: "Page $1", pages: "$1 pages", marked: "$1 marquées", selected: "$1 sélectionnées", matches: "$1 occurrences", files: "$1 fichiers", of: "$1 sur $2", useColour: "Utiliser la couleur $1", removeTool: "Retirer « $1 » de la barre" }),
    zh: Object.freeze({ page: "第 $1 页", pages: "$1 页", marked: "已标记 $1 页", selected: "已选择 $1 页", matches: "$1 个匹配项", files: "$1 个文件", of: "$1 / $2", useColour: "使用颜色 $1", removeTool: "从工具栏移除“$1”" }),
    ms: Object.freeze({ page: "Halaman $1", pages: "$1 halaman", marked: "$1 ditanda", selected: "$1 dipilih", matches: "$1 padanan", files: "$1 fail", of: "$1 daripada $2", useColour: "Gunakan warna $1", removeTool: "Alih keluar ‘$1’ daripada bar alat" }),
  });

  function translateDynamic(source, language) {
    if (language === "es") return source;
    const templates = dynamicTemplates[language];
    const removeTool = source.match(/^Quitar «(.+)» de la barra$/);
    if (removeTool) {
      const label = dictionaries[language][removeTool[1]] || removeTool[1];
      return templates.removeTool.replace("$1", label);
    }
    const rules = [
      [/^Página (\d+)$/, templates.page],
      [/^(\d+) páginas?$/, templates.pages],
      [/^(\d+) marcadas?$/, templates.marked],
      [/^(\d+) seleccionadas?$/, templates.selected],
      [/^(\d+) coincidencias?$/, templates.matches],
      [/^(\d+) archivos?$/, templates.files],
      [/^(\d+) de (\d+)$/, templates.of],
      [/^Usar color (.+)$/, templates.useColour],
    ];
    for (const [pattern, replacement] of rules) {
      if (pattern.test(source)) return source.replace(pattern, replacement);
    }
    return source;
  }

  function translate(source, requestedLanguage) {
    const language = normalizeLanguage(requestedLanguage);
    const value = String(source ?? "");
    return dictionaries[language][value] || translateDynamic(value, language);
  }

  function canTranslate(source) {
    const value = String(source ?? "");
    if (Object.prototype.hasOwnProperty.call(dictionaries.es, value)) return true;
    return [
      /^Página \d+$/,
      /^\d+ páginas?$/,
      /^\d+ marcadas?$/,
      /^\d+ seleccionadas?$/,
      /^\d+ coincidencias?$/,
      /^\d+ archivos?$/,
      /^\d+ de \d+$/,
      /^Usar color .+$/,
      /^Quitar «.+» de la barra$/,
    ].some((pattern) => pattern.test(value));
  }

  return Object.freeze({
    languages,
    rows: Object.freeze(rows.map((row) => Object.freeze([...row]))),
    normalizeLanguage,
    translate,
    canTranslate,
  });
});
