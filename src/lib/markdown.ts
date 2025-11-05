import React from "react";

interface ParsedElement {
  type: "p" | "ul" | "hr";
  size?: "lg" | "base" | "sm";
  content: React.ReactNode;
  key: string;
}

const formatText = (text: string): React.ReactNode[] => {
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  
  const regex = /(\*\*(.+?)\*\*)|(\*(.+?)\*)/g;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    
    if (match[2]) {
      parts.push(React.createElement("strong", { key: `bold-${match.index}` }, match[2]));
    } else if (match[4]) {
      parts.push(React.createElement("em", { key: `italic-${match.index}` }, match[4]));
    }
    
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : [text];
};

export const parseMarkdownContent = (content: string, enableBold: boolean = true): React.ReactNode => {
  if (!content) return null;

  const normalizedContent = content.replace(/\\n/g, "\n");
  const lines = normalizedContent.split(/\r?\n/);
  const elements: ParsedElement[] = [];
  let listItems: string[] = [];
  let elementKey = 0;

  const flushListItems = () => {
    if (listItems.length > 0) {
      const liElements = listItems.map((item, idx) => 
        React.createElement("li", { key: `li-${elementKey}-${idx}`, className: "text-foreground" }, formatText(item))
      );
      elements.push({
        type: "ul",
        content: liElements,
        key: `ul-${elementKey}`,
      });
      elementKey++;
      listItems = [];
    }
  };

  lines.forEach((line) => {
    const trimmedLine = line.trim();

    if (!trimmedLine) {
      flushListItems();
      return;
    }

    if (trimmedLine === "---") {
      flushListItems();
      elements.push({
        type: "hr",
        content: null,
        key: `hr-${elementKey++}`,
      });
      return;
    }

    if (trimmedLine.startsWith("# ")) {
      flushListItems();
      const text = trimmedLine.slice(2).trim();
      elements.push({
        type: "p",
        size: "lg",
        content: formatText(text),
        key: `h1-${elementKey++}`,
      });
    }
    else if (trimmedLine.startsWith("## ")) {
      flushListItems();
      const text = trimmedLine.slice(3).trim();
      elements.push({
        type: "p",
        size: "base",
        content: formatText(text),
        key: `h2-${elementKey++}`,
      });
    }
    else if (trimmedLine.startsWith("### ")) {
      flushListItems();
      const text = trimmedLine.slice(4).trim();
      elements.push({
        type: "p",
        size: "sm",
        content: formatText(text),
        key: `h3-${elementKey++}`,
      });
    }
    else if (trimmedLine.startsWith("- ")) {
      const itemText = trimmedLine.slice(2).trim();
      listItems.push(itemText);
    }
    else {
      flushListItems();
      elements.push({
        type: "p",
        size: "base",
        content: formatText(trimmedLine),
        key: `p-${elementKey++}`,
      });
    }
  });

  flushListItems();

  return elements.map((el) => {
    const baseClasses = "text-foreground mb-4";
    
    switch (el.type) {
      case "p": {
        const sizeClasses = {
          lg: enableBold ? "text-lg font-bold" : "text-lg",
          base: enableBold ? "text-base font-bold" : "text-base",
          sm: enableBold ? "text-sm font-bold" : "text-sm",
        };
        const size = el.size || "base";
        return React.createElement("p", { key: el.key, className: `${sizeClasses[size]} ${baseClasses}` }, el.content);
      }
      case "ul":
        return React.createElement("ul", { key: el.key, className: `list-disc list-inside space-y-2 ${baseClasses}` }, el.content);
      case "hr":
        return React.createElement("hr", { key: el.key, className: "my-6 border-t border-muted-foreground" });
      default:
        return null;
    }
  });
};