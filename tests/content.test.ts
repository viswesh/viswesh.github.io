import { describe, it, expect } from 'vitest';
import { now, experience, writing, projects, speaking, customers } from '../src/lib/content';

describe('content', () => {
  it('now has at least 3 bullets', () => {
    expect(now.bullets.length).toBeGreaterThanOrEqual(3);
  });

  it('experience starts with Atlan as current role', () => {
    expect(experience[0].company).toBe('Atlan');
    expect(experience[0].end).toBe('present');
  });

  it('experience is ordered most-recent first', () => {
    const starts = experience.map(e => e.start);
    for (let i = 0; i < starts.length - 1; i++) {
      expect(starts[i] >= starts[i + 1]).toBe(true);
    }
  });

  it('writing has at least 6 featured cards', () => {
    expect(writing.filter(w => w.featured).length).toBeGreaterThanOrEqual(6);
  });

  it('writing featured row is balanced across tags', () => {
    const featured = writing.filter(w => w.featured);
    const tags = new Set(featured.map(w => w.tag));
    expect(tags.has('strategy')).toBe(true);
    expect(tags.has('builder')).toBe(true);
    expect(tags.has('leader')).toBe(true);
  });

  it('projects has at least one entry with a CTA url', () => {
    expect(projects.length).toBeGreaterThanOrEqual(1);
    expect(projects[0].cta.url).toMatch(/^https?:|^\//);
  });

  it('speaking workshop url points to luma', () => {
    expect(speaking.workshop.url).toContain('luma.com');
  });

  it('customers covers atlan and adobe-experience-platform keys', () => {
    expect(customers['atlan']).toBeDefined();
    expect(customers['adobe-experience-platform']).toBeDefined();
    expect(customers['atlan'].length).toBeGreaterThanOrEqual(5);
    expect(customers['adobe-experience-platform'].length).toBeGreaterThanOrEqual(8);
  });
});
