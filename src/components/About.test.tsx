import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import About from './About';

describe('About Component', () => {
  it('renders the about section with correct heading', () => {
    render(<About />);
    
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('About Me');
  });

  it('renders the about content with paragraphs', () => {
    render(<About />);
    
    const paragraphs = screen.getAllByText(/I'm a passionate full-stack developer/);
    expect(paragraphs).toHaveLength(1);
    
    const secondParagraph = screen.getByText(/When I'm not coding/);
    expect(secondParagraph).toBeInTheDocument();
  });

  it('renders the skills section with correct heading', () => {
    render(<About />);
    
    const skillsHeading = screen.getByRole('heading', { level: 3 });
    expect(skillsHeading).toBeInTheDocument();
    expect(skillsHeading).toHaveTextContent('Core Technologies');
  });

  it('renders all technology skills in the list', () => {
    render(<About />);
    
    const expectedSkills = [
      'React.js & Redux',
      'JavaScript (ES6+)',
      'Node.js & Express',
      'MongoDB & PostgreSQL',
      'HTML5 & CSS3'
    ];

    expectedSkills.forEach(skill => {
      const skillItem = screen.getByText(skill);
      expect(skillItem).toBeInTheDocument();
    });
  });

  it('has the correct section ID for navigation', () => {
    render(<About />);
    
    const section = screen.getByTestId('about-section');
    expect(section).toHaveAttribute('id', 'about');
  });

  it('renders with proper CSS classes', () => {
    render(<About />);
    
    const section = screen.getByTestId('about-section');
    expect(section).toHaveClass('about');
    
    const container = section.querySelector('.container');
    expect(container).toBeInTheDocument();
    
    const aboutContent = container?.querySelector('.about-content');
    expect(aboutContent).toBeInTheDocument();
    
    const aboutText = container?.querySelector('.about-text');
    expect(aboutText).toBeInTheDocument();
    
    const aboutSkills = container?.querySelector('.about-skills');
    expect(aboutSkills).toBeInTheDocument();
  });

  it('contains the expected content structure', () => {
    render(<About />);
    
    // Check that the main content areas are present
    expect(screen.getByText(/passionate full-stack developer/)).toBeInTheDocument();
    expect(screen.getByText(/exploring new technologies/)).toBeInTheDocument();
    expect(screen.getByText(/Core Technologies/)).toBeInTheDocument();
    
    // Check that the skills list is properly structured
    const skillsList = screen.getByRole('list');
    expect(skillsList).toBeInTheDocument();
    
    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(5);
  });
}); 