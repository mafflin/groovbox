'use strict';

const { gb, alpha, mix } = require('./palette');

// In-between dark shades. Gruvbox's dark scale has big steps, so these blend two
// neighboring gruvbox colors to hit the lightness of VS Code's default (Tom's
// theme) exactly, keeping the steps between panels as soft as in the original.
const DARK = {
  side: mix(gb.dark0_hard, gb.dark0, 0.68), //      #242526  ≈ #252526
  hover: mix(gb.dark0, gb.dark0_soft, 0.56), //     #2e2c2c  ≈ #2a2d2e / #2d2d2d
  activity: mix(gb.dark0_soft, gb.dark1, 0.31), //  #353231  ≈ #333333
  band: mix(gb.dark0_soft, gb.dark1, 0.81), //      #3a3635  ≈ #373738 / #37373d
  control: mix(gb.dark1, gb.dark2, 0.21), //        #403c39  ≈ #3c3c3c
};

/**
 * Panel layout: VS Code's built-in default UI (what Tom Philbin's theme shows,
 * since it defines no UI colors), with every color replaced by the gruvbox color
 * of the closest lightness (dark: the in-between shades above). Comments give the VS Code default being replaced.
 * Like the original, the layout is fixed per mode: the contrast setting only
 * changes the editor (and the active tab, panel and breadcrumbs that follow it).
 */
const LAYOUT = {
  dark: {
    title: DARK.control, //              titleBar          #3c3c3c
    titleText: gb.light2, //             titleBar text     #cccccc
    activity: DARK.activity, //          activityBar       #333333
    activityIcon: gb.light0, //          icons             #ffffff
    activityIconInactive: gb.gray_245, // inactive icons   #ffffff66 over #333333
    side: DARK.side, //                  sideBar, tab strip, widgets  #252526
    sectionHeader: DARK.band, //         section header    #80808033 over #252526
    tabInactive: DARK.hover, //          inactive tab      #2d2d2d
    tabActiveText: gb.light0, //         active tab text   #ffffff
    tabInactiveText: gb.light4, //       inactive tab text #ffffff80 over #2d2d2d
    text: gb.light2, //                  foreground        #cccccc
    textMuted: gb.light4, //             description       #ccccccb3
    breadcrumb: gb.light3, //            breadcrumb        #cccccccc
    control: DARK.control, //            input, dropdown, menu  #3c3c3c
    controlBorder: '#00000000', //       input border      none
    hover: DARK.hover, //                list hover        #2a2d2e
    inactiveSelection: DARK.band, //     inactive select.  #37373d
    selection: gb.faded_blue, //         focused selection #04395e
    selectionText: gb.light0, //                           #ffffff
    accent: gb.faded_blue, //            button / status   #0e639c / #007acc
    accentHover: gb.neutral_blue, //     button hover      #1177bb
    accentText: gb.light0, //                              #ffffff
    secondaryButton: gb.dark1, //        secondary button  #3a3d41
    focus: gb.neutral_blue, //           focusBorder       #007fd4 (#076678 is invisible on dark)
    border: gb.dark2, //                 group/panel border, widget border  #444444 / #80808059
    badge: gb.dark2, //                  badge             #4d4d4d
    badgeText: gb.light0, //                               #ffffff
    separator: gb.dark3, //              menu separator    #606060
    panelTitle: gb.light0_soft, //       panel title       #e7e7e7
    panelTitleInactive: gb.light4, //                      #e7e7e799
    notificationHeader: gb.dark0_soft, // notification hdr #303031
    lineNumberActive: gb.light2, //      active line no.   #c6c6c6
  },
  light: {
    title: gb.light1, //                 titleBar          #dddddd
    titleText: gb.dark0_soft, //         titleBar text     #333333
    activity: gb.dark0, //               activityBar       #2c2c2c (dark, as in VS Code's Light)
    activityIcon: gb.light0, //          icons             #ffffff
    activityIconInactive: gb.gray_245, // inactive icons   #ffffff66 over #2c2c2c
    side: gb.light0_hard, //             sideBar, tab strip, widgets  #f3f3f3
    sideAlt: gb.light0, //               …when the editor is #f9f5d7 (Hard)
    sectionHeader: gb.light1, //         section header    #80808033 over #f3f3f3
    tabInactive: gb.light0_soft, //      inactive tab      #ececec (light0 would equal the Medium editor)
    tabInactiveAlt: gb.light0, //        …when the editor is #f2e5bc (Soft)
    tabActiveText: gb.dark0_soft, //     active tab text   #333333
    tabInactiveText: gb.dark3, //        inactive tab text #333333b3 over #ececec
    text: gb.dark3, //                   foreground        #616161
    textMuted: gb.dark3, //              description       #616161b3 (anything lighter drops below 4.5:1)
    breadcrumb: gb.dark3, //             breadcrumb        #616161cc (dark4 drops below 4.5:1 on Soft)
    control: gb.light0_hard, //          input, dropdown, menu  #ffffff
    controlBorder: gb.light1, //         input border: gruvbox has nothing lighter than the sidebar
    hover: gb.light0, //                 list hover        #f0f0f0
    inactiveSelection: gb.light0_soft, // inactive select. #e4e6f1
    selection: gb.faded_blue, //         focused selection #0060c0
    selectionText: gb.light0_hard, //                      #ffffff
    accent: gb.faded_blue, //            button / status   #007acc
    accentHover: gb.neutral_blue, //     button hover      #0062a3
    accentText: gb.light0_hard, //                         #ffffff
    secondaryButton: gb.dark3, //        secondary button  #5f6a79
    focus: gb.neutral_blue, //           focusBorder       #0090f1
    border: gb.light2, //                panel/widget border  #80808059
    badge: gb.light2, //                 badge             #c4c4c4
    badgeText: gb.dark0_soft, //                           #333333
    separator: gb.light2, //             menu separator    #d4d4d4
    panelTitle: gb.dark1, //             panel title       #424242
    panelTitleInactive: gb.dark3, //                       #424242bf (dark4 drops below 4.5:1 on Soft)
    notificationHeader: gb.light0_soft, // notification hdr #e7e7e7
    lineNumberActive: gb.dark1, //       active line no.   #0b216f
  },
};

/**
 * Workbench (UI) colors. The editor area follows the global settings of Brian
 * Reilly's Sublime port (caret, guides, line highlight, find); the panels follow
 * LAYOUT above.
 */
function workbenchColors(p) {
  const dark = p.mode === 'dark';
  const L = LAYOUT[p.mode];
  const transparent = '#00000000';
  const shadow = dark ? '#00000066' : alpha(p.bg4, 0.4);
  const n = p.neutral;
  const groupBorder = dark ? L.border : gb.light0_soft; // editorGroup.border #444444 / #e7e7e7
  // The sidebar must not match the editor: the shade step is the only divider.
  const side = L.side === p.bg0 ? L.sideAlt : L.side;
  // Inactive tabs must not match the active tab, which shares the editor background.
  const tabInactive = L.tabInactive === p.bg0 ? L.tabInactiveAlt : L.tabInactive;

  return {
    // ── Base ───────────────────────────────────────────────────────────────
    foreground: L.text,
    disabledForeground: p.bg4,
    descriptionForeground: L.textMuted,
    errorForeground: p.red,
    focusBorder: L.focus,
    'icon.foreground': L.text,
    'selection.background': alpha(p.bg3, 0.6),
    'widget.shadow': shadow,
    'widget.border': L.border,
    'sash.hoverBorder': L.focus,
    'scrollbar.shadow': shadow,
    'scrollbarSlider.background': alpha(p.bg3, 0.4),
    'scrollbarSlider.hoverBackground': alpha(p.bg3, 0.7),
    'scrollbarSlider.activeBackground': alpha(p.bg4, 0.8),
    'progressBar.background': p.aqua,
    'textLink.foreground': p.blue,
    'textLink.activeForeground': p.aqua,
    'textPreformat.foreground': p.aqua,
    'textBlockQuote.background': p.bg1,
    'textBlockQuote.border': p.bg3,
    'textCodeBlock.background': p.bg1,
    'textSeparator.foreground': p.bg3,

    // ── Buttons / inputs ──────────────────────────────────────────────────
    'button.background': L.accent,
    'button.foreground': L.accentText,
    'button.hoverBackground': L.accentHover,
    'button.secondaryBackground': L.secondaryButton,
    'button.secondaryForeground': L.accentText,
    'button.secondaryHoverBackground': dark ? p.bg2 : p.fg2,
    'button.separator': alpha(L.accentText, 0.4),
    'checkbox.background': L.control,
    'checkbox.border': dark ? L.control : L.controlBorder,
    'checkbox.foreground': p.fg1,
    'dropdown.background': L.control,
    'dropdown.border': dark ? L.control : L.controlBorder,
    'dropdown.foreground': p.fg1,
    'dropdown.listBackground': L.control,
    'input.background': L.control,
    'input.border': L.controlBorder,
    'input.foreground': p.fg1,
    'input.placeholderForeground': dark ? gb.light3 : gb.dark3, // #a6a6a6 / #767676, one step up to stay above 4.5:1
    'inputOption.activeBackground': alpha(p.blue, 0.3),
    'inputOption.activeBorder': L.focus,
    'inputOption.activeForeground': p.fg0,
    'inputValidation.errorBackground': side,
    'inputValidation.errorBorder': p.red,
    'inputValidation.warningBackground': side,
    'inputValidation.warningBorder': p.yellow,
    'inputValidation.infoBackground': side,
    'inputValidation.infoBorder': p.blue,
    'badge.background': L.badge,
    'badge.foreground': L.badgeText,

    // ── Lists / trees ─────────────────────────────────────────────────────
    'list.activeSelectionBackground': L.selection,
    'list.activeSelectionForeground': L.selectionText,
    'list.activeSelectionIconForeground': L.selectionText,
    'list.inactiveSelectionBackground': L.inactiveSelection,
    'list.hoverBackground': L.hover,
    'list.focusOutline': L.focus,
    'list.highlightForeground': p.blue,
    'list.focusHighlightForeground': gb.bright_yellow,
    'list.dropBackground': alpha(p.bg2, 0.8),
    'list.errorForeground': p.red,
    'list.warningForeground': p.yellow,
    'list.invalidItemForeground': p.red,
    'listFilterWidget.background': side,
    'listFilterWidget.outline': L.focus,
    'listFilterWidget.noMatchesOutline': p.red,
    'tree.indentGuidesStroke': p.bg3,
    'tree.inactiveIndentGuidesStroke': alpha(p.bg3, 0.5),

    // ── Activity bar / side bar ───────────────────────────────────────────
    'activityBar.background': L.activity,
    'activityBar.foreground': L.activityIcon,
    'activityBar.inactiveForeground': L.activityIconInactive,
    'activityBar.border': transparent,
    'activityBar.activeBorder': L.activityIcon,
    'activityBar.activeBackground': transparent,
    'activityBarBadge.background': L.accent,
    'activityBarBadge.foreground': L.accentText,
    'activityBarTop.foreground': L.panelTitle,
    'activityBarTop.inactiveForeground': L.panelTitleInactive,
    'activityBarTop.activeBorder': L.panelTitle,
    'sideBar.background': side,
    'sideBar.foreground': L.text,
    'sideBar.border': transparent,
    'sideBarTitle.foreground': L.text,
    'sideBarSectionHeader.background': L.sectionHeader,
    'sideBarSectionHeader.foreground': L.text,
    'sideBarSectionHeader.border': transparent,

    // ── Title bar / menus / command center ────────────────────────────────
    'titleBar.activeBackground': L.title,
    'titleBar.activeForeground': L.titleText,
    'titleBar.inactiveBackground': L.title,
    'titleBar.inactiveForeground': alpha(L.titleText, 0.6),
    'titleBar.border': transparent,
    'menubar.selectionBackground': alpha(L.titleText, 0.1),
    'menubar.selectionForeground': L.titleText,
    'menu.background': L.control,
    'menu.foreground': p.fg1,
    'menu.border': L.border,
    'menu.selectionBackground': L.selection,
    'menu.selectionForeground': L.selectionText,
    'menu.separatorBackground': L.separator,
    'commandCenter.background': alpha(L.titleText, 0.05),
    'commandCenter.foreground': L.titleText,
    'commandCenter.border': alpha(L.titleText, 0.2),
    'commandCenter.activeBackground': alpha(L.titleText, 0.08),
    'commandCenter.activeForeground': L.titleText,
    'commandCenter.inactiveForeground': alpha(L.titleText, 0.6),
    'quickInput.background': side,
    'quickInput.foreground': L.text,
    'quickInputList.focusBackground': L.selection,
    'quickInputList.focusForeground': L.selectionText,
    'quickInputList.focusIconForeground': L.selectionText,
    'pickerGroup.border': L.border,
    'pickerGroup.foreground': p.blue,
    'keybindingLabel.background': alpha(p.bg3, 0.3),
    'keybindingLabel.foreground': L.text,
    'keybindingLabel.border': alpha(p.bg3, 0.6),
    'keybindingLabel.bottomBorder': alpha(p.bg4, 0.6),

    // ── Status bar ────────────────────────────────────────────────────────
    'statusBar.background': L.accent,
    'statusBar.foreground': L.accentText,
    'statusBar.border': transparent,
    'statusBar.focusBorder': L.accentText,
    'statusBar.noFolderBackground': gb.faded_purple, // #68217a
    'statusBar.noFolderForeground': L.accentText,
    'statusBar.debuggingBackground': gb.faded_orange, // #cc6633 (neutral_orange is 3.4:1 under white text)
    'statusBar.debuggingForeground': L.accentText,
    'statusBar.debuggingBorder': transparent,
    'statusBarItem.hoverBackground': alpha(gb.light0, 0.12),
    'statusBarItem.activeBackground': alpha(gb.light0, 0.18),
    'statusBarItem.prominentBackground': alpha(gb.dark0_hard, 0.5),
    'statusBarItem.prominentHoverBackground': alpha(gb.dark0_hard, 0.3),
    'statusBarItem.remoteBackground': gb.faded_aqua, // #16825d
    'statusBarItem.remoteForeground': L.accentText,
    'statusBarItem.errorBackground': gb.faded_red,
    'statusBarItem.errorForeground': L.accentText,
    'statusBarItem.warningBackground': gb.neutral_yellow,
    'statusBarItem.warningForeground': gb.dark0, // white on any gruvbox yellow is below 4.5:1

    // ── Tabs / editor groups / breadcrumbs ────────────────────────────────
    'editorGroup.border': groupBorder,
    'editorGroup.dropBackground': alpha(p.bg2, 0.6),
    'editorGroupHeader.tabsBackground': side,
    'editorGroupHeader.tabsBorder': transparent,
    'editorGroupHeader.noTabsBackground': p.bg0,
    'tab.border': side,
    'tab.activeBackground': p.bg0, // same as the editor
    'tab.activeForeground': L.tabActiveText,
    'tab.activeBorder': transparent,
    'tab.activeBorderTop': transparent,
    'tab.unfocusedActiveBackground': p.bg0,
    'tab.unfocusedActiveForeground': alpha(L.tabActiveText, 0.5),
    'tab.inactiveBackground': tabInactive,
    'tab.inactiveForeground': L.tabInactiveText,
    'tab.unfocusedInactiveForeground': alpha(L.tabInactiveText, 0.5),
    'tab.lastPinnedBorder': L.border,
    'tab.activeModifiedBorder': p.yellow,
    'tab.inactiveModifiedBorder': alpha(p.yellow, 0.5),
    'breadcrumb.background': p.bg0,
    'breadcrumb.foreground': L.breadcrumb,
    'breadcrumb.focusForeground': L.tabActiveText,
    'breadcrumb.activeSelectionForeground': L.tabActiveText,
    'breadcrumbPicker.background': side,

    // ── Editor ────────────────────────────────────────────────────────────
    'editor.background': p.bg0,
    'editor.foreground': p.text,
    'editorCursor.foreground': p.fg4, // Sublime caret
    'editorCursor.background': p.bg0,
    'editorLineNumber.foreground': p.gray, // Sublime gutterForeground
    'editorLineNumber.activeForeground': L.lineNumberActive,
    'editor.lineHighlightBackground': p.bg1, // Sublime lineHighlight
    'editor.lineHighlightBorder': transparent,
    // Deliberate deviation: Sublime uses opaque bg1 (same as the line highlight).
    'editor.selectionBackground': alpha(p.bg3, 0.6),
    'editor.inactiveSelectionBackground': alpha(p.bg3, 0.35),
    'editor.selectionHighlightBackground': alpha(p.aqua, 0.2),
    'editor.wordHighlightBackground': alpha(p.bg3, 0.4),
    'editor.wordHighlightStrongBackground': alpha(p.bg3, 0.7),
    'editor.wordHighlightTextBackground': alpha(p.bg3, 0.4),
    'editor.findMatchBackground': alpha(n.yellow, 0.6), // Sublime findHighlight
    'editor.findMatchBorder': n.yellow,
    'editor.findMatchHighlightBackground': alpha(n.yellow, 0.3),
    'editor.findRangeHighlightBackground': alpha(p.bg2, 0.5),
    'editor.rangeHighlightBackground': alpha(p.bg2, 0.4),
    'editor.symbolHighlightBackground': alpha(p.yellow, 0.25),
    'editor.hoverHighlightBackground': alpha(p.aqua, 0.2),
    'editor.foldBackground': alpha(p.bg2, 0.3),
    'editor.linkedEditingBackground': alpha(p.blue, 0.2),
    'editor.snippetTabstopHighlightBackground': alpha(p.bg2, 0.6),
    'editor.snippetFinalTabstopHighlightBorder': p.bg3,
    'editor.stackFrameHighlightBackground': alpha(p.yellow, 0.25),
    'editor.focusedStackFrameHighlightBackground': alpha(p.aqua, 0.25),
    'editorLink.activeForeground': p.blue,
    'editorWhitespace.foreground': alpha(p.fg1, 0x26 / 255), // Sublime invisibles
    'editorIndentGuide.background': alpha(p.fg1, 0x26 / 255), // Sublime guide
    'editorIndentGuide.activeBackground': alpha(p.fg1, 0x80 / 255), // Sublime activeGuide
    'editorIndentGuide.background1': alpha(p.fg1, 0x26 / 255),
    'editorIndentGuide.activeBackground1': alpha(p.fg1, 0x80 / 255),
    'editorRuler.foreground': p.bg1, // ColorColumn
    'editorCodeLens.foreground': p.gray,
    'editorInlayHint.foreground': p.gray,
    'editorInlayHint.background': alpha(p.bg1, 0.6),
    'editorGhostText.foreground': p.bg4,
    'editorBracketMatch.background': transparent,
    'editorBracketMatch.border': p.fg3, // Sublime underlines matching brackets in fg3
    'editorUnnecessaryCode.opacity': '#000000a0',
    'editorStickyScroll.background': p.bg0,
    'editorStickyScroll.shadow': shadow,
    'editorStickyScrollHover.background': p.bg1,

    // Rainbow brackets: same colors as gruvbox.vim's rainbow_guifgs.
    'editorBracketHighlight.foreground1': n.orange,
    'editorBracketHighlight.foreground2': n.red,
    'editorBracketHighlight.foreground3': n.purple,
    'editorBracketHighlight.foreground4': n.blue,
    'editorBracketHighlight.foreground5': n.aqua,
    'editorBracketHighlight.foreground6': n.yellow,
    'editorBracketHighlight.unexpectedBracket.foreground': p.red,
    'editorBracketPairGuide.activeBackground1': alpha(n.orange, 0.6),
    'editorBracketPairGuide.activeBackground2': alpha(n.red, 0.6),
    'editorBracketPairGuide.activeBackground3': alpha(n.purple, 0.6),
    'editorBracketPairGuide.activeBackground4': alpha(n.blue, 0.6),
    'editorBracketPairGuide.activeBackground5': alpha(n.aqua, 0.6),
    'editorBracketPairGuide.activeBackground6': alpha(n.yellow, 0.6),

    // Diagnostics
    'editorError.foreground': p.red,
    'editorWarning.foreground': p.yellow,
    'editorInfo.foreground': p.blue,
    'editorHint.foreground': p.aqua,
    'problemsErrorIcon.foreground': p.red,
    'problemsWarningIcon.foreground': p.yellow,
    'problemsInfoIcon.foreground': p.blue,
    'editorLightBulb.foreground': p.yellow,
    'editorLightBulbAutoFix.foreground': p.aqua,

    // Gutter (GitGutter colors)
    'editorGutter.background': p.bg0,
    'editorGutter.addedBackground': p.aqua,
    'editorGutter.modifiedBackground': p.yellow,
    'editorGutter.deletedBackground': p.red,
    'editorGutter.foldingControlForeground': p.fg4,
    'editorGutter.commentRangeForeground': p.bg3,

    // Overview ruler / minimap
    'editorOverviewRuler.border': transparent,
    'editorOverviewRuler.background': p.bg0,
    'editorOverviewRuler.findMatchForeground': alpha(n.yellow, 0.8),
    'editorOverviewRuler.selectionHighlightForeground': alpha(p.aqua, 0.6),
    'editorOverviewRuler.wordHighlightForeground': alpha(p.bg4, 0.8),
    'editorOverviewRuler.wordHighlightStrongForeground': alpha(p.fg4, 0.8),
    'editorOverviewRuler.rangeHighlightForeground': alpha(p.bg3, 0.8),
    'editorOverviewRuler.bracketMatchForeground': p.bg4,
    'editorOverviewRuler.errorForeground': p.red,
    'editorOverviewRuler.warningForeground': p.yellow,
    'editorOverviewRuler.infoForeground': p.blue,
    'editorOverviewRuler.addedForeground': alpha(p.aqua, 0.7),
    'editorOverviewRuler.modifiedForeground': alpha(p.yellow, 0.7),
    'editorOverviewRuler.deletedForeground': alpha(p.red, 0.7),
    'minimap.background': p.bg0,
    'minimap.findMatchHighlight': alpha(n.yellow, 0.7),
    'minimap.selectionHighlight': alpha(p.bg3, 0.8),
    'minimap.errorHighlight': p.red,
    'minimap.warningHighlight': p.yellow,
    'minimapSlider.background': alpha(p.bg3, 0.3),
    'minimapSlider.hoverBackground': alpha(p.bg3, 0.5),
    'minimapSlider.activeBackground': alpha(p.bg4, 0.5),
    'minimapGutter.addedBackground': p.aqua,
    'minimapGutter.modifiedBackground': p.yellow,
    'minimapGutter.deletedBackground': p.red,

    // ── Widgets (suggest, hover, find, peek) ──────────────────────────────
    'editorWidget.background': side,
    'editorWidget.foreground': p.fg1,
    'editorWidget.border': L.border,
    'editorWidget.resizeBorder': p.bg3,
    'editorSuggestWidget.background': side,
    'editorSuggestWidget.foreground': p.fg1,
    'editorSuggestWidget.border': L.border,
    'editorSuggestWidget.selectedBackground': L.selection,
    'editorSuggestWidget.selectedForeground': L.selectionText,
    'editorSuggestWidget.highlightForeground': p.blue,
    'editorSuggestWidget.focusHighlightForeground': gb.bright_yellow,
    'editorSuggestWidgetStatus.foreground': p.fg4,
    'editorHoverWidget.background': side,
    'editorHoverWidget.foreground': p.fg1,
    'editorHoverWidget.border': L.border,
    'editorHoverWidget.highlightForeground': p.blue,
    'editorHoverWidget.statusBarBackground': side,
    'debugExceptionWidget.background': p.bg1,
    'debugExceptionWidget.border': p.red,
    'editorMarkerNavigation.background': p.bg1,
    'editorMarkerNavigationError.background': p.red,
    'editorMarkerNavigationWarning.background': p.yellow,
    'editorMarkerNavigationInfo.background': p.blue,
    'peekView.border': p.bg3,
    'peekViewTitle.background': p.bg1,
    'peekViewTitleLabel.foreground': p.fg1,
    'peekViewTitleDescription.foreground': p.fg4,
    'peekViewEditor.background': p.bg0,
    'peekViewEditorGutter.background': p.bg0,
    'peekViewEditor.matchHighlightBackground': alpha(p.yellow, 0.3),
    'peekViewResult.background': p.bg1,
    'peekViewResult.fileForeground': p.fg1,
    'peekViewResult.lineForeground': p.fg3,
    'peekViewResult.matchHighlightBackground': alpha(p.yellow, 0.3),
    'peekViewResult.selectionBackground': p.bg2,
    'peekViewResult.selectionForeground': p.fg0,

    // ── Diff editor / merge conflicts ─────────────────────────────────────
    'diffEditor.insertedTextBackground': alpha(p.aqua, 0.25),
    'diffEditor.removedTextBackground': alpha(p.red, 0.25),
    'diffEditor.insertedLineBackground': alpha(p.aqua, 0.12),
    'diffEditor.removedLineBackground': alpha(p.red, 0.12),
    'diffEditor.diagonalFill': alpha(p.bg2, 0.6),
    'diffEditor.border': p.bg1,
    'diffEditorGutter.insertedLineBackground': alpha(p.aqua, 0.2),
    'diffEditorGutter.removedLineBackground': alpha(p.red, 0.2),
    'diffEditorOverview.insertedForeground': alpha(p.aqua, 0.6),
    'diffEditorOverview.removedForeground': alpha(p.red, 0.6),
    'merge.currentHeaderBackground': alpha(p.aqua, 0.4),
    'merge.currentContentBackground': alpha(p.aqua, 0.15),
    'merge.incomingHeaderBackground': alpha(p.blue, 0.4),
    'merge.incomingContentBackground': alpha(p.blue, 0.15),
    'merge.commonHeaderBackground': alpha(p.bg4, 0.4),
    'merge.commonContentBackground': alpha(p.bg4, 0.15),
    'merge.border': transparent,
    'editorOverviewRuler.currentContentForeground': p.aqua,
    'editorOverviewRuler.incomingContentForeground': p.blue,
    'editorOverviewRuler.commonContentForeground': p.bg4,

    // ── Git decorations ───────────────────────────────────────────────────
    'gitDecoration.addedResourceForeground': p.aqua,
    'gitDecoration.modifiedResourceForeground': p.yellow,
    'gitDecoration.deletedResourceForeground': p.red,
    'gitDecoration.renamedResourceForeground': p.blue,
    'gitDecoration.untrackedResourceForeground': p.aqua,
    'gitDecoration.ignoredResourceForeground': p.bg4,
    'gitDecoration.conflictingResourceForeground': p.purple,
    'gitDecoration.submoduleResourceForeground': p.blue,
    'gitDecoration.stageModifiedResourceForeground': p.yellow,
    'gitDecoration.stageDeletedResourceForeground': p.red,

    // ── Panel / terminal ──────────────────────────────────────────────────
    'panel.background': p.bg0,
    'panel.border': L.border,
    'panel.dropBorder': p.bg3,
    'panelTitle.activeForeground': L.panelTitle,
    'panelTitle.activeBorder': L.panelTitle,
    'panelTitle.inactiveForeground': L.panelTitleInactive,
    'panelSection.border': L.border,
    'panelSectionHeader.background': p.bg0,
    'panelInput.border': p.bg2,
    'outputView.background': p.bg0,
    'terminal.background': p.bg0,
    'terminal.foreground': p.fg1,
    'terminal.border': p.bg1,
    'terminal.selectionBackground': alpha(p.bg3, 0.6),
    'terminal.inactiveSelectionBackground': alpha(p.bg3, 0.35),
    'terminal.findMatchBackground': alpha(n.yellow, 0.6),
    'terminal.findMatchHighlightBackground': alpha(n.yellow, 0.3),
    'terminalCursor.foreground': p.fg1,
    'terminalCursor.background': p.bg0,
    'terminalCommandDecoration.defaultBackground': p.bg4,
    'terminalCommandDecoration.successBackground': p.green,
    'terminalCommandDecoration.errorBackground': p.red,
    // g:terminal_color_0..15 as set by gruvbox.vim
    'terminal.ansiBlack': dark ? p.bg0 : gb.dark0, // gruvbox.vim uses the background; light themes keep black dark
    'terminal.ansiRed': n.red,
    'terminal.ansiGreen': n.green,
    'terminal.ansiYellow': n.yellow,
    'terminal.ansiBlue': n.blue,
    'terminal.ansiMagenta': n.purple,
    'terminal.ansiCyan': n.aqua,
    'terminal.ansiWhite': p.fg4,
    'terminal.ansiBrightBlack': p.gray,
    'terminal.ansiBrightRed': p.red,
    'terminal.ansiBrightGreen': p.green,
    'terminal.ansiBrightYellow': p.yellow,
    'terminal.ansiBrightBlue': p.blue,
    'terminal.ansiBrightMagenta': p.purple,
    'terminal.ansiBrightCyan': p.aqua,
    'terminal.ansiBrightWhite': p.fg1,

    // ── Notifications / banners ───────────────────────────────────────────
    'notifications.background': side,
    'notifications.foreground': L.text,
    'notifications.border': L.border,
    'notificationCenterHeader.background': L.notificationHeader,
    'notificationCenterHeader.foreground': L.text,
    'notificationCenter.border': L.border,
    'notificationToast.border': L.border,
    'notificationLink.foreground': p.blue,
    'notificationsErrorIcon.foreground': p.red,
    'notificationsWarningIcon.foreground': p.yellow,
    'notificationsInfoIcon.foreground': p.blue,
    'banner.background': p.bg1,
    'banner.foreground': p.fg1,
    'banner.iconForeground': p.blue,

    // ── Debug ─────────────────────────────────────────────────────────────
    'debugToolBar.background': dark ? L.activity : side, // #333333 / #f3f3f3
    'debugToolBar.border': p.bg2,
    'debugIcon.breakpointForeground': p.red,
    'debugIcon.breakpointDisabledForeground': p.gray,
    'debugIcon.breakpointUnverifiedForeground': p.fg4,
    'debugIcon.breakpointCurrentStackframeForeground': p.yellow,
    'debugIcon.breakpointStackframeForeground': p.aqua,
    'debugIcon.startForeground': p.green,
    'debugIcon.pauseForeground': p.blue,
    'debugIcon.stopForeground': p.red,
    'debugIcon.disconnectForeground': p.red,
    'debugIcon.restartForeground': p.green,
    'debugIcon.stepOverForeground': p.blue,
    'debugIcon.stepIntoForeground': p.blue,
    'debugIcon.stepOutForeground': p.blue,
    'debugIcon.continueForeground': p.blue,
    'debugIcon.stepBackForeground': p.blue,
    'debugTokenExpression.name': p.blue,
    'debugTokenExpression.value': p.fg2,
    'debugTokenExpression.string': p.green,
    'debugTokenExpression.boolean': p.purple,
    'debugTokenExpression.number': p.purple,
    'debugTokenExpression.error': p.red,
    'debugConsole.infoForeground': p.blue,
    'debugConsole.warningForeground': p.yellow,
    'debugConsole.errorForeground': p.red,
    'debugConsole.sourceForeground': p.fg2,
    'debugConsoleInputIcon.foreground': p.aqua,

    // ── Symbol icons ──────────────────────────────────────────────────────
    'symbolIcon.arrayForeground': p.fg2,
    'symbolIcon.booleanForeground': p.purple,
    'symbolIcon.classForeground': p.yellow,
    'symbolIcon.colorForeground': p.purple,
    'symbolIcon.constantForeground': p.purple,
    'symbolIcon.constructorForeground': p.green,
    'symbolIcon.enumeratorForeground': p.yellow,
    'symbolIcon.enumeratorMemberForeground': p.purple,
    'symbolIcon.eventForeground': p.orange,
    'symbolIcon.fieldForeground': p.blue,
    'symbolIcon.fileForeground': p.fg2,
    'symbolIcon.folderForeground': p.fg2,
    'symbolIcon.functionForeground': p.green,
    'symbolIcon.interfaceForeground': p.yellow,
    'symbolIcon.keyForeground': p.blue,
    'symbolIcon.keywordForeground': p.red,
    'symbolIcon.methodForeground': p.green,
    'symbolIcon.moduleForeground': p.aqua,
    'symbolIcon.namespaceForeground': p.aqua,
    'symbolIcon.nullForeground': p.purple,
    'symbolIcon.numberForeground': p.purple,
    'symbolIcon.objectForeground': p.yellow,
    'symbolIcon.operatorForeground': p.fg2,
    'symbolIcon.packageForeground': p.aqua,
    'symbolIcon.propertyForeground': p.blue,
    'symbolIcon.referenceForeground': p.blue,
    'symbolIcon.snippetForeground': p.fg2,
    'symbolIcon.stringForeground': p.green,
    'symbolIcon.structForeground': p.yellow,
    'symbolIcon.textForeground': p.fg2,
    'symbolIcon.typeParameterForeground': p.yellow,
    'symbolIcon.unitForeground': p.purple,
    'symbolIcon.variableForeground': p.blue,

    // ── Misc ──────────────────────────────────────────────────────────────
    'welcomePage.tileBackground': p.bg1,
    'welcomePage.tileHoverBackground': p.bg2,
    'walkThrough.embeddedEditorBackground': p.bg1,
    'settings.headerForeground': p.fg1,
    'settings.modifiedItemIndicator': p.yellow,
    'settings.focusedRowBackground': alpha(p.bg1, 0.6),
    'settings.rowHoverBackground': alpha(p.bg1, 0.4),
    'settings.focusedRowBorder': transparent,
    'notebook.cellBorderColor': p.bg1,
    'notebook.focusedCellBorder': p.bg3,
    'notebook.cellEditorBackground': p.bg1,
    'notebook.selectedCellBackground': alpha(p.bg1, 0.6),
    'notebookStatusSuccessIcon.foreground': p.green,
    'notebookStatusErrorIcon.foreground': p.red,
    'notebookStatusRunningIcon.foreground': p.blue,
    'extensionButton.prominentBackground': L.accent,
    'extensionButton.prominentForeground': L.accentText,
    'extensionButton.prominentHoverBackground': L.accentHover,
    'extensionBadge.remoteBackground': p.blue,
    'extensionBadge.remoteForeground': p.bg0,
    'extensionIcon.starForeground': p.yellow,
    'charts.foreground': p.fg1,
    'charts.lines': p.bg3,
    'charts.red': p.red,
    'charts.blue': p.blue,
    'charts.yellow': p.yellow,
    'charts.orange': p.orange,
    'charts.green': p.green,
    'charts.purple': p.purple,
  };
}

module.exports = { workbenchColors };
