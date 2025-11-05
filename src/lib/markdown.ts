import React from "react";

interface ParsedElement {
  type: "p" | "ul";
  size?: "lg" | "base" | "sm";
  content: React.ReactNode;
  key: string;
}

const formatText = (text: string): React.ReactNode[] => {
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  
  // Obsługujemy zarówno **bold** jak i *italic*
  // Ważne: najpierw obsługujemy ** żeby nie zderzało się z pojedynczymi *
  const regex = /(\*\*(.+?)\*\*)|(\*(.+?)\*)/g;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    
    // match[1] - całe **text** lub *text*
    // match[2] - tekst wewnątrz **
    // match[3] - całe *text*
    // match[4] - tekst wewnątrz *
    
    if (match[2]) {
      // **bold**
      parts.push(React.createElement("strong", { key: `bold-${match.index}` }, match[2]));
    } else if (match[4]) {
      // *italic*
      parts.push(React.createElement("em", { key: `italic-${match.index}` }, match[4]));
    }
    
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : [text];
};

export const parseMarkdownContent = (content: string): React.ReactNode => {
  if (!content) return null;

  // Obsługujemy zarówno \n, \r\n jak i escapeowany \\n z API
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

    // Skip empty lines
    if (!trimmedLine) {
      flushListItems();
      return;
    }

    // Heading 1 (largest - text-lg)
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
    // Heading 2 (medium - text-base)
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
    // Heading 3 (small - text-sm)
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
    // List item
    else if (trimmedLine.startsWith("- ")) {
      const itemText = trimmedLine.slice(2).trim();
      listItems.push(itemText);
    }
    // Regular paragraph
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

  // Create React elements with proper styling
  return elements.map((el) => {
    const baseClasses = "text-foreground mb-4";
    
    switch (el.type) {
      case "p": {
        const sizeClasses = {
          lg: "text-lg font-bold",
          base: "text-base font-bold",
          sm: "text-sm font-bold",
        };
        const size = el.size || "base";
        return React.createElement("p", { key: el.key, className: `${sizeClasses[size]} ${baseClasses}` }, el.content);
      }
      case "ul":
        return React.createElement("ul", { key: el.key, className: `list-disc list-inside space-y-2 ${baseClasses}` }, el.content);
      default:
        return null;
    }
  });
};