export type SvgNormalizationOptions = {
  minArea?: number;
  fill?: string;
};

function getAttr(tag: string, name: string): string | null {
  const match = tag.match(
    new RegExp(String.raw`(?:^|\s)${name}="([^"]*)"`, 'i'),
  );
  return match?.[1] ?? null;
}

function replaceImageTag(tag: string, fill: string): string {
  const attrs = [
    ['id', getAttr(tag, 'id')],
    ['x', getAttr(tag, 'x')],
    ['y', getAttr(tag, 'y')],
    ['width', getAttr(tag, 'width')],
    ['height', getAttr(tag, 'height')],
    ['transform', getAttr(tag, 'transform')],
    ['rx', getAttr(tag, 'rx')],
    ['ry', getAttr(tag, 'ry')],
    ['class', getAttr(tag, 'class')],
    ['style', getAttr(tag, 'style')],
  ].filter(([, value]) => value != null) as Array<[string, string]>;

  const serializedAttrs = attrs.map(([name, value]) => ` ${name}="${value}"`).join('');
  return `<rect${serializedAttrs} fill="${fill}" data-vrt-placeholder="true" />`;
}

export function normalizeSvgReference(
  source: string,
  options: SvgNormalizationOptions = {},
): { source: string; replaced: number } {
  const { minArea = 250_000, fill = '#e5e7eb' } = options;
  const imageTagRe = /<image\b[\s\S]*?\/>/gi;
  let replaced = 0;

  const normalized = source.replace(imageTagRe, (tag) => {
    const width = Number(getAttr(tag, 'width'));
    const height = Number(getAttr(tag, 'height'));
    if (!Number.isFinite(width) || !Number.isFinite(height)) {
      return tag;
    }
    if (width * height < minArea) {
      return tag;
    }

    replaced += 1;
    return replaceImageTag(tag, fill);
  });

  return { source: normalized, replaced };
}
