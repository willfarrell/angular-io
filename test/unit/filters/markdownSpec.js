describe('markdown', function() {
	var markdownFilter;

	beforeEach(module('io.filters'));
	beforeEach(inject(function($filter) {
		markdownFilter = $filter('markdown');
	}));

	it('should convert markdown to html', function() {
		expect(markdownFilter('p')).toEqual('<p>p</p>');
		expect(markdownFilter('# H1')).toEqual('<h1>H1</h1>');
		expect(markdownFilter('## H2')).toEqual('<h2>H2</h2>');
		expect(markdownFilter('**b**')).toEqual('<p><strong>b</strong></p>');
		expect(markdownFilter('__b__')).toEqual('<p><strong>b</strong></p>');
		expect(markdownFilter('*em*')).toEqual('<p><em>em</em></p>');
		expect(markdownFilter('_em_')).toEqual('<p><em>em</em></p>');
		expect(markdownFilter('- li')).toEqual('<ul>\n<li>li</li>\n</ul>');
	});
});