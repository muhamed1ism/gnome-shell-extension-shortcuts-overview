/* extension.js
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * SPDX-License-Identifier: GPL-2.0-or-later
 */
import { Extension } from "resource:///org/gnome/shell/extensions/extension.js";
import St from "gi://St";
import getFocusedAppName from "./helper.js";

import * as Main from "resource:///org/gnome/shell/ui/main.js";

let label, button, focusSignal;

export default class PlainExampleExtension extends Extension {
  enable() {
    label = new St.Label({
      text: `Focused App: ${getFocusedAppName()}`,
      style_class: "focused-app-label",
    });

    button = new St.Button({
      style_class: "panel-button",
      reactive: true,
      child: label,
    });

    focusSignal = global.display.connect("notify::focus-window", () => {
      label.set_text(`Focused App: ${getFocusedAppName()}`);
    });

    Main.panel._rightBox.insert_child_at_index(button, 0);
  }

  disable() {
    if (focusSignal) {
      global.display.disconnect(focusSignal);
      focusSignal = null;
    }

    if (button) {
      button.destroy();
      button = null;
    }
  }
}
